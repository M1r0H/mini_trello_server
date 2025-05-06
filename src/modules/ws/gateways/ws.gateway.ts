import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Board } from '@modules/boards/entities/board.entity';
import { Column } from '@modules/columns/entities/column.entity';
import { Task } from '@modules/tasks/entities/task.entity';
import { LoggerService } from '@core/services/logger.service';

@WebSocketGateway({
  namespace: '/ws',
  cors: {
    origin: '*',
    credentials: true,
  },
})
export class WsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  public server: Server;

  private readonly logger: LoggerService;

  public handleConnection(client: Socket): void {
    this.logger.log(`🟢 WS connected: ${client.id}`, 'WsGateway');
  }

  public handleDisconnect(client: Socket): void {
    this.logger.log(`🔴 WS disconnected: ${client.id}`, 'WsGateway');
  }

  // boards
  public emitBoardCreated(board: Board): void {
    this.server.emit('boardCreated', board);
  }

  public emitBoardUpdated(board: Board): void {
    this.server.emit('boardUpdated', board);
  }

  public emitBoardDeleted(boardId: string): void {
    this.server.emit('boardDeleted', boardId);
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

  public emitTaskDeleted(taskId: string): void {
    this.server.emit('taskDeleted', taskId);
  }
}
