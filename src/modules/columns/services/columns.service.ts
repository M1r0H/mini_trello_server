import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Column } from '@modules/columns/entities/column.entity';
import { ColumnCreateParams, ColumnEditParams } from '@modules/columns/types/service.types';
import { WsGateway } from '@modules/ws/gateways/ws.gateway';

@Injectable()
export class ColumnsService {
  @InjectRepository(Column)
  private readonly columnRepository: Repository<Column>;

  private readonly wsGateway: WsGateway;

  public async one(id: string): Promise<Column | null> {
    return this.columnRepository.findOne({
      where: {
        id,
      },
    });
  }

  public async create(params: ColumnCreateParams): Promise<Column> {
    const saved = await this.columnRepository.save(params);

    this.wsGateway.emitColumnCreated(saved);

    return saved;
  }

  public async edit(params: ColumnEditParams): Promise<Column> {
    const { id, body } = params;
    const old = await this.one(id);
    const saved = await this.columnRepository.save({
      ...old,
      ...body,
    });

    this.wsGateway.emitColumnUpdated(saved);

    return saved;
  }

  public async delete(id: string): Promise<Column | null> {
    const removing = await this.one(id);

    await this.columnRepository.softRemove({ id });
    this.wsGateway.emitColumnDeleted(id);

    return removing;
  }
}
