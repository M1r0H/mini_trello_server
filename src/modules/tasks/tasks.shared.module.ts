import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '@modules/tasks/entities/task.entity';
import { TasksService } from '@modules/tasks/services/tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  providers: [TasksService],
  exports: [TasksService],
})
export class TasksSharedModule {}
