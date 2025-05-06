import { TokenVariants } from '@modules/auth/constants';
import { User } from '@modules/users/entities/user.entity';

export interface GenerateTokenParams {
  user: User;
  expiry: string;
  type: TokenVariants;
}

export interface ResponseInterface {
  user: User | null;
  token?: string;
}
