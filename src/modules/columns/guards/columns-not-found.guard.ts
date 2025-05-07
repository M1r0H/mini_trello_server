import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { BaseGuard } from '@core/guards/base.guard';
import { ColumnsService } from '@modules/columns/services/columns.service';

@Injectable()
export class ColumnsNotFoundGuard extends BaseGuard<{ id: string }> {
  @Inject(ColumnsService)
  private columnsService: ColumnsService;

  public async process(): Promise<boolean> {
    const id = this.request.params.id;

    if (!id) {
      this.error('Invalid ID', HttpStatus.BAD_REQUEST);
    }

    const column = await this.columnsService.one(id).catch(() => null);

    if (!column) {
      this.error(`Column with ID ${id} not found`, HttpStatus.NOT_FOUND);
    }

    return true;
  }
}
