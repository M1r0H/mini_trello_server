import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { BaseGuard } from '@core/guards/base.guard';
import { TasksService } from '@modules/tasks/services/tasks.service';

@Injectable()
export class TasksNotFoundGuard extends BaseGuard<{ id: string }> {
  @Inject(TasksService)
  private tasksService: TasksService;

  public async process(): Promise<boolean> {
    const id = this.request.params.id;

    if (!id) {
      this.error('Invalid ID', HttpStatus.BAD_REQUEST);
    }

    const video = await this.tasksService.one(id).catch(() => null);

    if (!video) {
      this.error(`Task with ID ${id} not found`, HttpStatus.NOT_FOUND);
    }

    return true;
  }
}
