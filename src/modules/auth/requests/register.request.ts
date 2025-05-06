import { IsEmail, IsNotEmpty } from 'class-validator';
import { UserAlreadyRegistered } from '@modules/users/decorators/auth-user-already-registered.decorator';

export class RegisterRequest {
  @IsEmail()
  @IsNotEmpty()
  @UserAlreadyRegistered()
  public email: string;
}
