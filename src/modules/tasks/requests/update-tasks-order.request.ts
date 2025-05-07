import { IsInt, IsString, IsUUID } from 'class-validator';

export class UpdateTasksOrderRequest {
  @IsUUID()
  public id: string;

  @IsString()
  public columnId: string;

  @IsInt()
  public order: number;

  @IsString()
  public title: string;

  @IsString()
  public description: string;
}
