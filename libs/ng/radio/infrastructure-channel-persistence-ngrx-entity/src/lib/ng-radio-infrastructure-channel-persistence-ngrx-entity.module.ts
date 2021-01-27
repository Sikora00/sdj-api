import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { ChannelPersistenceService } from '@sdj/ng/radio/core/application-services';
import * as fromChannel from './channel.reducer';
import { NgrxEntityChannelPersistenceService } from './ngrx-entity-channel-persistence.service';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromChannel.channelsFeatureKey, fromChannel.reducer),
  ],
  providers: [
    {
      provide: ChannelPersistenceService,
      useClass: NgrxEntityChannelPersistenceService,
    },
  ],
})
export class NgRadioInfrastructureChannelPersistenceNgrxEntityModule {}
