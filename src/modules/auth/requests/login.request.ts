import { IsEmail, IsNotEmpty } from 'class-validator';
import { UserExist } from '@modules/users/decorators/auth-user-exist.decorator';

export class LoginRequest {
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail()
  @UserExist({ message: 'Invalid credentials' })
  public email: string;
}
