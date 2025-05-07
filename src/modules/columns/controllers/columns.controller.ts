import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ColumnsNotFoundGuard } from '@modules/columns/guards/columns-not-found.guard';
import { ColumnsService } from '@modules/columns/services/columns.service';
import { Column } from '@modules/columns/entities/column.entity';

@Controller('columns')
export class ColumnsController {
  public constructor(
    private readonly columnsService: ColumnsService,
  ) {}

  @Get()
  public index(): Promise<Column[]> {
    return this.columnsService.all();
  }

  @Post()
  public create(@Body() body: {
    title: string;
    order: number;
    boardId: string;
  }): Promise<Column> {
    return this.columnsService.create(body);
  }

  @Patch(':id')
  @UseGuards(ColumnsNotFoundGuard)
  public edit(
    @Param('id') id: string,
    @Body() body: {
      title: string;
      order: number;
      boardId: string;
    },
  ): Promise<Column> {
    return this.columnsService.edit({ id, body });
  }

  @Delete(':id')
  @UseGuards(ColumnsNotFoundGuard)
  public delete(@Param('id') id: string): Promise<Column | null> {
    return this.columnsService.delete(id);
  }
}
