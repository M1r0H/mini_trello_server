import { Module } from '@nestjs/common';
import { UsersSharedModule } from '@modules/users/users.shared.module';
import { IsUserExist } from '@modules/users/decorators/auth-user-exist.decorator';
import { IsUserAlreadyRegistered } from '@modules/users/decorators/auth-user-already-registered.decorator';

@Module({
  imports: [UsersSharedModule],
  controllers: [],
  providers: [
    // decorators
    IsUserExist,
    IsUserAlreadyRegistered,
  ],
  exports: [],
})
export class UsersModule {}
