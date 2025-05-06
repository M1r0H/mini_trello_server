import {
  Column as ColumnType,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Column } from '@modules/columns/entities/column.entity';

@Entity('boards')
export class Board {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ColumnType()
  public title: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @DeleteDateColumn()
  public deletedAt?: Date;

  @OneToMany(
    () => Column,
    ({ board }) => board,
    { onDelete: 'CASCADE' },
  )
  public columns: Column[];
}
