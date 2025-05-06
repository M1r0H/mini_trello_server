import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Board } from '@modules/boards/entities/board.entity';
import { ResponseInterface } from '@core/types/types';
import { BoardCreateParams, BoardEditParams } from '@modules/boards/types/service.types';
import { WsGateway } from '@modules/ws/gateways/ws.gateway';

@Injectable()
export class BoardsService {
  @InjectRepository(Board)
  private readonly boardRepository: Repository<Board>;

  private readonly wsGateway: WsGateway;

  public query(): SelectQueryBuilder<Board> {
    return this.boardRepository.createQueryBuilder('boards');
  }

  public async all(): Promise<ResponseInterface<Board>> {
    const [ boards, count ] = await this.query().getManyAndCount();

    return {
      data: boards,
      total: count,
    };
  }

  public async one(id: string): Promise<Board | null> {
    return this.boardRepository.findOne({
      where: {
        id,
      },
    });
  }

  public async create(params: BoardCreateParams): Promise<Board> {
    const saved = await this.boardRepository.save(params);

    this.wsGateway.emitBoardCreated(saved);

    return saved;
  }

  public async edit(params: BoardEditParams): Promise<Board> {
    const { id, body } = params;
    const old = await this.one(id);
    const saved = await this.boardRepository.save({
      ...old,
      ...body,
    });

    this.wsGateway.emitBoardUpdated(saved);

    return saved;
  }

  public async delete(id: string): Promise<Board | null> {
    const removing = await this.one(id);

    await this.boardRepository.softRemove({ id });
    this.wsGateway.emitBoardDeleted(id);

    return removing;
  }
}
