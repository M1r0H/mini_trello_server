import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository, SelectQueryBuilder } from 'typeorm';
import { ResponseInterface } from '@core/types/types';
import { User } from '@modules/users/entities/user.entity';
import { UserCreateParams, UserEditParams } from '@modules/users/types/service.types';

@Injectable()
export class UsersService {
  @InjectRepository(User)
  private usersRepository: Repository<User>;

  public query(): SelectQueryBuilder<User> {
    return this.usersRepository.createQueryBuilder('users');
  }

  public async all(): Promise<ResponseInterface<User>> {
    const [ users, count ] = await this.query().getManyAndCount();

    return {
      data: users,
      total: count,
    };
  }

  public async oneByWhere(where: FindOptionsWhere<User> | FindOptionsWhere<User>[]): Promise<User | null> {
    return this.usersRepository.findOne({
      where,
    });
  }

  public async one(id: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: {
        id,
      },
    });
  }

  public create(params: UserCreateParams): Promise<User> {
    return this.usersRepository.save(params);
  }

  public async edit(params: UserEditParams): Promise<User> {
    const { id, body } = params;
    const old = await this.one(id);

    return this.usersRepository.save({
      ...old,
      ...body,
    });
  }

  public async delete(id: string): Promise<User | null> {
    const removing = await this.one(id);

    await this.usersRepository.softRemove({ id });

    return removing;
  }
}
