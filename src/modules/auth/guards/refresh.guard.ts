import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenVariants } from '@modules/auth/constants';

@Injectable()
export class RefreshGuard implements CanActivate {
  public constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const refreshToken = request.cookies[TokenVariants.refresh];

    if (!refreshToken) {
      throw new UnauthorizedException('No refresh token');
    }

    try {
      request['user'] = await this.jwtService.verifyAsync(
        refreshToken,
        {
          secret: this.configService.get('JWT_SECRET'),
        },
      );
    } catch {
      throw new UnauthorizedException();
    }

    return true;

  }
}
