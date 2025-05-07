import { RegisterRequest } from '@modules/auth/requests/register.request';
import { ResponseInterface } from '@modules/auth/types/controller.types';
import { Request, Response } from 'express';
import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateToken } from '@modules/auth/decorators/auth-create-token.decorator';
import { CreateTokenInterceptor } from '@modules/auth/interceptors/create-token.interceptor';
import { LoginRequest } from '@modules/auth/requests/login.request';
import { Public } from '@core/decorators/public.decorator';
import { TokenVariants } from '@modules/auth/constants';
import { RefreshGuard } from '@modules/auth/guards/refresh.guard';
import { RefreshTokenInterceptor } from '@modules/auth/interceptors/refresh-token.interceptor';
import { UsersService } from '@modules/users/services/users.service';
import { User } from '@modules/users/entities/user.entity';

@UseInterceptors(CreateTokenInterceptor)
@Controller('auth')
export class AuthController {
  public constructor(
    private readonly usersService: UsersService,
  ) {}

  @Post('/registration')
  @Public()
  @CreateToken()
  public async signUp(
    @Body() body: RegisterRequest,
  ): Promise<ResponseInterface> {
    return {
      user: await this.usersService.create(body),
    };
  }

  @Post('/login')
  @Public()
  @CreateToken()
  public async signIn(@Body() body: LoginRequest): Promise<ResponseInterface> {
    return {
      user: await this.usersService.oneByWhere({ email: body.email }),
    };
  }

  @Get('/')
  public check(@Req() req: Request): ResponseInterface {
    return {
      user: req.user as User ?? null,
      checked: true,
    };
  }

  @Get('/logout')
  public logout(@Res() res: Response): Response {
    res.clearCookie(TokenVariants.access, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
    res.clearCookie(TokenVariants.refresh, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    return res.status(HttpStatus.NO_CONTENT).send();
  }

  @Public()
  @UseGuards(RefreshGuard)
  @UseInterceptors(RefreshTokenInterceptor)
  @Post('refresh')
  public async refresh(): Promise<{ checked: boolean }>  {
    return { checked: true };
  }
}
