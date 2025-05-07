import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Task } from '@modules/tasks/entities/task.entity';
import { TaskCreateParams, TaskEditParams, TaskUpdateBatchParams } from '@modules/tasks/types/service.types';
import { WsGateway } from '@modules/ws/gateways/ws.gateway';

@Injectable()
export class TasksService {
  @InjectRepository(Task)
  private readonly taskRepository: Repository<Task>;

  @Inject(WsGateway)
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

  public async updateTasksBatch(tasks: TaskUpdateBatchParams[]): Promise<void> {
    const ids = tasks.map((t) => t.id);

    const existingTasks = await this.taskRepository.find({
      where: {
        id: In(ids),
      },
    });

    const updates = existingTasks.map((task) => {
      const updated = tasks.find((t) => t.id === task.id);

      if (!updated) {
        return task;
      }

      task.columnId = updated.columnId;
      task.order = updated.order;

      return task;
    });

    await this.taskRepository.save(updates);

    this.wsGateway.emitTaskBatchUpdated(updates);
  }

  public async delete(id: string): Promise<Task | null> {
    const removing = await this.one(id);

    await this.taskRepository.softRemove({ id });

    this.wsGateway.emitTaskDeleted(id);

    return removing;
  }
}
