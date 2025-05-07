import { Module } from '@nestjs/common';
import { ColumnsSharedModule } from '@modules/columns/columns.shared.module';
import { ColumnsController } from '@modules/columns/controllers/columns.controller';
import { WsGateway } from '@modules/ws/gateways/ws.gateway';

@Module({
  imports: [ColumnsSharedModule, WsGateway],
  controllers: [ColumnsController],
})
export class ColumnsModule {}
