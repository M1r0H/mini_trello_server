import {
  Column as ColumnType,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Board } from '@modules/boards/entities/board.entity';
import { Task } from '@modules/tasks/entities/task.entity';

@Entity('columns')
export class Column {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ColumnType()
  public title: string;

  @ColumnType({ default: 0 })
  public order: number;

  @ColumnType()
  public boardId: string;

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

  @ManyToOne(
    () => Board,
    ({ id }) => id,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'boardId' })
  public board: Board;
}
