import { Module } from '@nestjs/common';
import { BoardsSharedModule } from '@modules/boards/boards.shared.module';
import { BoardsController } from '@modules/boards/controllers/boards.controller';

@Module({
  imports: [BoardsSharedModule],
  controllers: [BoardsController],
})
export class BoardsModule {}
