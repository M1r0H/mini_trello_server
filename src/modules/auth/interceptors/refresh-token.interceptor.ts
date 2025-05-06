import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TokenVariants } from '@modules/auth/constants';
import { pick } from 'lodash';
import { Request, Response } from 'express';
import { User } from '@modules/users/entities/user.entity';

@Injectable()
export class RefreshTokenInterceptor implements NestInterceptor {
  public constructor(
    private readonly jwtService: JwtService,
  ) {
  }

  public intercept(context: ExecutionContext, next: CallHandler): Observable<{user: User}> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request<{ id: string, email: string }>>();

    return next.handle().pipe(
      map((responseData: { user: User }) => {
        const newAccessToken = this.jwtService.sign(
          {
            ...pick(request.user, ['id', 'email']),
            type: TokenVariants.access,
          },
          {
            secret: process.env.JWT_SECRET,
            expiresIn: '15m',
          },
        );
        const newRefreshToken = this.jwtService.sign(
          {
            ...pick(request.user, ['id', 'email']),
            type: TokenVariants.refresh,
          },
          {
            secret: process.env.JWT_SECRET,
            expiresIn: '30d',
          },
        );

        response.cookie(TokenVariants.access, newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 15 * 60 * 1000,
        });
        response.cookie(TokenVariants.refresh , newRefreshToken, {
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
}
