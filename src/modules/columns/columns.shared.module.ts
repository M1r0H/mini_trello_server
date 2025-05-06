import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Column } from '@modules/columns/entities/column.entity';
import { ColumnsService } from '@modules/columns/services/columns.service';

@Module({
  imports: [TypeOrmModule.forFeature([Column])],
  providers: [ColumnsService],
  exports: [ColumnsService],
})
export class ColumnsSharedModule {}
