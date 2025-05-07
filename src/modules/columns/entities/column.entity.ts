import {
  Column as ColumnType,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Task } from '@modules/tasks/entities/task.entity';

@Entity('columns')
export class Column {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ColumnType()
  public title: string;

  @ColumnType({ default: 0 })
  public order: number;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @DeleteDateColumn()
  public deletedAt?: Date;

  @OneToMany(
    () => Task,
    ({ column }) => column,
    { onDelete: 'CASCADE' },
  )
  public tasks: Task[];
}
