import { NgModule } from '@angular/core';
import { WebSocketClient } from '@sdj/ng/core/shared/port';
import { WebSocketClientAdapter } from './web-socket-client-adapter';

@NgModule({
  providers: [{ provide: WebSocketClient, useFactory: () => WebSocketClientAdapter.getInstance() }]
})
export class NgCoreSharedInfrastructureWebSocketModule {}
