import { Module } from '@nestjs/common';
import { ColumnsSharedModule } from '@modules/columns/columns.shared.module';
import { ColumnsController } from '@modules/columns/controllers/columns.controller';

@Module({
  imports: [ColumnsSharedModule],
  controllers: [ColumnsController],
})
export class ColumnsModule {}
