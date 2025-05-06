import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { BoardsService } from '@modules/boards/services/boards.service';
import { BaseGuard } from '@core/guards/base.guard';

@Injectable()
export class ColumnsNotFoundGuard extends BaseGuard<{ id: string }> {
  @Inject(BoardsService)
  private boardsService: BoardsService;

  public async process(): Promise<boolean> {
    const id = this.request.params.id;

    if (!id) {
      this.error('Invalid ID', HttpStatus.BAD_REQUEST);
    }

    const video = await this.boardsService.one(id).catch(() => null);

    if (!video) {
      this.error(`Column with ID ${id} not found`, HttpStatus.NOT_FOUND);
    }

    return true;
  }
}
