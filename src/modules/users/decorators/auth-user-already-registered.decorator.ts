import { Inject, Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UsersService } from '@modules/users/services/users.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsUserAlreadyRegistered implements ValidatorConstraintInterface {
  @Inject(UsersService)
  private readonly usersService: UsersService;

  public async validate(email: string): Promise<boolean> {
    return !(await this.usersService.oneByWhere({ email }));

  }

  public defaultMessage(): string {
    return `Invalid credentials`;
  }
}

export function UserAlreadyRegistered(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserAlreadyRegistered,
    });
  };
}
