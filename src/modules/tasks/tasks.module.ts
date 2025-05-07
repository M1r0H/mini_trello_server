import { Module } from '@nestjs/common';
import { TasksSharedModule } from '@modules/tasks/tasks.shared.module';
import { TasksController } from '@modules/tasks/controllers/tasks.controller';
import { TasksBatchController } from '@modules/tasks/controllers/tasks-batch.controller';

@Module({
  imports: [TasksSharedModule],
  controllers: [TasksController, TasksBatchController],
})
export class TasksModule {}
