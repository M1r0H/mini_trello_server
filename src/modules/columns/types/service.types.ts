export interface ColumnCreateParams {
  title: string;
  order: number;
  boardId: string;
}

export interface ColumnEditParams {
  id: string;
  body: Partial<ColumnCreateParams>;
}
