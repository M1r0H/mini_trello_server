import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from '@modules/boards/entities/board.entity';
import { BoardsService } from '@modules/boards/services/boards.service';

@Module({
  imports: [TypeOrmModule.forFeature([Board])],
  providers: [BoardsService],
  exports: [BoardsService],
})
export class BoardsSharedModule {}
