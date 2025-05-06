import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { BoardsService } from '@modules/boards/services/boards.service';
import { Board } from '@modules/boards/entities/board.entity';
import { ResponseInterface } from '@core/types/types';
import { BoardsNotFoundGuard } from '@modules/boards/guards/boards-not-found.guard';

@Controller('boards')
export class BoardsController {
  public constructor(
    private readonly boardsService: BoardsService,
  ) {}

  @Get()
  public index(): Promise<ResponseInterface<Board>> {
    return this.boardsService.all();
  }

  @Get(':id')
  @UseGuards(BoardsNotFoundGuard)
  public view(@Param('id') id: string): Promise<Board | null> {
    return this.boardsService.one(id);
  }

  @Post()
  public create(@Body() body: { title: string }): Promise<Board> {
    return this.boardsService.create(body);
  }

  @Patch(':id')
  @UseGuards(BoardsNotFoundGuard)
  public edit(
    @Param('id') id: string,
    @Body() body: { title: string },
  ): Promise<Board> {
    return this.boardsService.edit({ id, body });
  }

  @Delete(':id')
  @UseGuards(BoardsNotFoundGuard)
  public delete(@Param('id') id: string): Promise<Board | null> {
    return this.boardsService.delete(id);
  }
}
