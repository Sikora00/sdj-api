import { NgModule } from '@angular/core';
import { WebSocketClient } from '@sdj/ng/shared/core/application-services';
import { WebSocketClientAdapter } from './web-socket-client-adapter';

@NgModule({
  providers: [
    {
      provide: WebSocketClient,
      useFactory: () => WebSocketClientAdapter.getInstance(),
    },
  ],
})
export class NgSharedInfrastructureWsSocketIoModule {}
