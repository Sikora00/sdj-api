import { Module } from '@nestjs/common';
import { StoreAdapter } from './store.adapter';

const providers = [StoreAdapter];

@Module({
  providers: providers,
  exports: providers,
})
export class BackendRadioInfrastructureModule {}
