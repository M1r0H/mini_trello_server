import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@modules/auth/auth.module';
import { UsersModule } from '@modules/users/users.module';
import { TasksModule } from '@modules/tasks/tasks.module';
import { WsModule } from '@modules/ws/ws.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { AuthGuard } from '@modules/auth/guards/auth.guard';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AllExceptionsFilter } from '@core/filters/http-exception.filter';
import { CustomValidationPipe } from '@core/pipes/validation.pipe';
import { StripSensitiveFieldsInterceptor } from '@core/interseptors/strip-sensitive-fields.interceptor';
import { JwtModule } from '@nestjs/jwt';
import { LoggerModule } from '@core/modules/logger.module';
import { typeOrmAsyncConfig } from '@config/typeorm.config';
import { ColumnsModule } from '@modules/columns/columns.module';

@Module({
  imports: [
    // Core modules
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: typeOrmAsyncConfig,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60,
        limit: 100,
      },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: '1h',
        },
      }),
    }),
    LoggerModule,

    // Additional modules
    AuthModule,
    UsersModule,
    ColumnsModule,
    TasksModule,
    WsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_PIPE,
      useClass: CustomValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: StripSensitiveFieldsInterceptor,
    },
  ],
})
export class AppModule {
}
