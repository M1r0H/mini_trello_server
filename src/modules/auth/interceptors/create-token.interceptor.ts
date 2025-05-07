import { CREATE_TOKEN_KEY } from '@modules/auth/decorators/auth-create-token.decorator';
import { GenerateTokenParams } from '@modules/auth/types/controller.types';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Response } from 'express';
import { map } from 'rxjs/operators';
import { TokenVariants } from '@modules/auth/constants';
import { User } from '@modules/users/entities/user.entity';

@Injectable()
export class CreateTokenInterceptor implements NestInterceptor {
  public constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {
  }

  public intercept(context: ExecutionContext, next: CallHandler): Observable<{user: User}> {
    const shouldCreateToken = this.reflector.get<boolean>(
      CREATE_TOKEN_KEY,
      context.getHandler(),
    );

    if (!shouldCreateToken) {
      return next.handle();
    }

    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();

    return next.handle().pipe(
      map((responseData: { user: User }) => {
        const access = this.getAuthTokenString({
          user: responseData.user,
          expiry: '1min',
          type: TokenVariants.access,
        });
        const refresh = this.getAuthTokenString({
          user: responseData.user,
          expiry: '30d',
          type: TokenVariants.refresh,
        });

        response.cookie(TokenVariants.access, access, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 15 * 60 * 1000,
        });
        response.cookie(TokenVariants.refresh, refresh, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        return {
          user: responseData.user,
        };
      }),
    );
  }

  private getAuthTokenString({ user, expiry, type }: GenerateTokenParams): string {
    return this.jwtService.sign({
      user,
      type,
    },
    {
      secret: process.env.JWT_SECRET,
      expiresIn: expiry,
    },
    );
  }
}
