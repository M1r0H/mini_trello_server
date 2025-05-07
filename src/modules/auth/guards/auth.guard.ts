import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '@core/decorators/public.decorator';
import { TokenVariants } from '@modules/auth/constants';
import { User } from '@modules/users/entities/user.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(
    private jwtService: JwtService,
    public configService: ConfigService,
    private reflector: Reflector,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = request.cookies[TokenVariants.access];

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      request['user'] = (await this.jwtService.verifyAsync<{user: User}>(
        token,
        {
          secret: this.configService.get('JWT_SECRET'),
        },
      )).user;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
}
