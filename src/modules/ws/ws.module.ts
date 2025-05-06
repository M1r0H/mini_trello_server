import { Global, Module } from '@nestjs/common';
import { WsGateway } from '@modules/ws/gateways/ws.gateway';

@Global()
@Module({
  providers: [WsGateway],
  exports: [WsGateway],
})
export class WsModule {}
