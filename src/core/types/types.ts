import { FindOptionsWhere } from 'typeorm';

export type ResponseInterface <T> = {
  data: T[];
  total: number;
}

export enum OrderType {
  asc = 'ASC',
  desc = 'DESC',
}

export interface AllParams<
  F = Record<string, unknown>,
  W = FindOptionsWhere<unknown> | FindOptionsWhere<unknown>[],
  R = string[]
> {
  relations?: R;
  search?: string;
  perPage?: number;
  page?: number;
  sort?: { orderBy: string; orderDir: OrderType };
  filters?: F;
  where?: W;
}

