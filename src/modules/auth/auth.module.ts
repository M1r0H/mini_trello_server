import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from '@modules/auth/controllers/auth.controller';
import { JwtStrategy } from '@modules/auth/strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AuthSharedModule } from '@modules/auth/auth.shared.module';
import { UsersSharedModule } from '@modules/users/users.shared.module';

@Module({
  imports: [
    JwtModule,
    ConfigModule,
    PassportModule,
    AuthSharedModule,
    UsersSharedModule,
  ],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
  ],
})
export class AuthModule {}
