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
export class IsUserExist implements ValidatorConstraintInterface {
  @Inject(UsersService)
  private readonly usersService: UsersService;

  public async validate(email: string): Promise<boolean> {
    const employee = await this.usersService.oneByWhere({ email });

    return !!employee;
  }

  public defaultMessage(): string {
    return 'User doesn\'t exist';
  }
}

export function UserExist(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserExist,
    });
  };
}
