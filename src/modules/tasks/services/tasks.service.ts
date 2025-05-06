import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '@modules/tasks/entities/task.entity';
import { TaskCreateParams, TaskEditParams } from '@modules/tasks/types/service.types';
import { WsGateway } from '@modules/ws/gateways/ws.gateway';

@Injectable()
export class TasksService {
  @InjectRepository(Task)
  private readonly taskRepository: Repository<Task>;

  private readonly wsGateway: WsGateway;

  public async one(id: string): Promise<Task | null> {
    return this.taskRepository.findOne({
      where: {
        id,
      },
    });
  }

  public async create(params: TaskCreateParams): Promise<Task> {
    const saved = await this.taskRepository.save(params);

    this.wsGateway.emitTaskCreated(saved);

    return saved;
  }

  public async edit(params: TaskEditParams): Promise<Task> {
    const { id, body } = params;
    const old = await this.one(id);
    const saved = await this.taskRepository.save({
      ...old,
      ...body,
    });

    this.wsGateway.emitTaskUpdated(saved);

    return saved;
  }

  public async delete(id: string): Promise<Task | null> {
    const removing = await this.one(id);

    await this.taskRepository.softRemove({ id });
    this.wsGateway.emitTaskDeleted(id);

    return removing;
  }
}
