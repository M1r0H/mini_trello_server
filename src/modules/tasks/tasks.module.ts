import { Module } from '@nestjs/common';
import { TasksSharedModule } from '@modules/tasks/tasks.shared.module';
import { TasksController } from '@modules/tasks/controllers/tasks.controller';

@Module({
  imports: [TasksSharedModule],
  controllers: [TasksController],
})
export class TasksModule {}
