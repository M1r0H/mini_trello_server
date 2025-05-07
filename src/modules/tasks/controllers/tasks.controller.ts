import { Body, Controller, Delete, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { TasksService } from '@modules/tasks/services/tasks.service';
import { Task } from '@modules/tasks/entities/task.entity';
import { TasksNotFoundGuard } from '@modules/tasks/guards/tasks-not-found.guard';

@Controller('tasks/common')
export class TasksController {
  public constructor(
    private readonly tasksService: TasksService,
  ) {}

  @Post()
  public create(@Body() body: {
    title: string;
    description?: string;
    order?: number;
    columnId: string;
  }): Promise<Task> {
    return this.tasksService.create(body);
  }

  @Patch(':id')
  @UseGuards(TasksNotFoundGuard)
  public edit(
    @Param('id') id: string,
    @Body() body: {
      title: string;
      description?: string;
      order?: number;
      columnId: string;
    },
  ): Promise<Task> {
    return this.tasksService.edit({ id, body });
  }

  @Delete(':id')
  @UseGuards(TasksNotFoundGuard)
  public delete(@Param('id') id: string): Promise<Task | null> {
    return this.tasksService.delete(id);
  }
}
