import {
  Column as ColumnType,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Column } from '@modules/columns/entities/column.entity';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ColumnType()
  public title: string;

  @ColumnType({ nullable: true })
  public description: string;

  @ColumnType({ default: 0 })
  public order: number;

  @ColumnType()
  public columnId: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @DeleteDateColumn()
  public deletedAt?: Date;

  @ManyToOne(
    () => Column,
    ({ id }) => id,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'columnId' })
  public column: Column;
}
