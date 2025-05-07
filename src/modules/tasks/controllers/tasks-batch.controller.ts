import { Body, Controller, Patch } from '@nestjs/common';
import { TasksService } from '@modules/tasks/services/tasks.service';
import { UpdateTasksBatchRequest } from '@modules/tasks/requests/update-tasks-batch.request';

@Controller('tasks/batch')
export class TasksBatchController  {
  public constructor(
    private readonly tasksService: TasksService,
  ) {}

  @Patch()
  public async updateTasksBatch(@Body() body: UpdateTasksBatchRequest): Promise<void> {
    await this.tasksService.updateTasksBatch(body.tasks);
  }
}
