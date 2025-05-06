export interface BoardCreateParams {
  title: string;
}

export interface BoardEditParams {
  id: string;
  body: Partial<BoardCreateParams>;
}
