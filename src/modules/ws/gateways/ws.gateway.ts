import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Column } from '@modules/columns/entities/column.entity';
import { Task } from '@modules/tasks/entities/task.entity';
import { LoggerService } from '@core/services/logger.service';
import { Inject } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
    credentials: true,
  },
})
export class WsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  public server: Server;

  @Inject(LoggerService)
  private readonly logger: LoggerService;

  public handleConnection(client: Socket): void {
    this.logger.log(`WS connected: ${client.id}`, 'WsGateway');
  }

  public handleDisconnect(client: Socket): void {
    this.logger.log(`WS disconnected: ${client.id}`, 'WsGateway');
  }

  // columns
  public emitColumnCreated(column: Column): void {
    this.server.emit('columnCreated', column);
  }

  public emitColumnUpdated(column: Column): void {
    this.server.emit('columnUpdated', column);
  }

  public emitColumnDeleted(columnId: string): void {
    this.server.emit('columnDeleted', columnId);
  }

  // tasks
  public emitTaskCreated(task: Task): void {
    this.server.emit('taskCreated', task);
  }

  public emitTaskUpdated(task: Task): void {
    this.server.emit('taskUpdated', task);
  }

  public emitTaskBatchUpdated(task: Task[]): void {
    this.server.emit('taskBatchUpdated', task);
  }

  public emitTaskDeleted(taskId: string): void {
    this.server.emit('taskDeleted', taskId);
  }
}
