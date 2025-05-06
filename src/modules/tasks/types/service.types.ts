export interface TaskCreateParams {
  title: string;
  description?: string;
  order?: number;
  columnId: string;
}

export interface TaskEditParams {
  id: string;
  body: Partial<TaskCreateParams>;
}
