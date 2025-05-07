import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateTasksOrderRequest } from '@modules/tasks/requests/update-tasks-order.request';

export class UpdateTasksBatchRequest {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateTasksOrderRequest)
  public tasks: UpdateTasksOrderRequest[];
}
