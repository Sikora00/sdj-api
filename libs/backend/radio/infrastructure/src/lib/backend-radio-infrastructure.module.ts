import { Module } from '@nestjs/common';
import { Store } from '@sdj/backend/radio/core/application-services';
import { StoreAdapter } from './store.adapter';

@Module({
  providers: [StoreAdapter, { provide: Store, useExisting: StoreAdapter }],
  exports: [Store],
})
export class BackendRadioInfrastructureModule {}
