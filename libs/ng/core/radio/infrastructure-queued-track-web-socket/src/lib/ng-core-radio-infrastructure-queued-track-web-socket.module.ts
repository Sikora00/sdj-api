import { NgModule } from '@angular/core';
import { QueuedTrackRepository } from '@sdj/ng/core/radio/application-services';
import { QueuedTrackRepositoryAdapter } from './repositories/queued-track-repository.adapter';

@NgModule({
  providers: [
    { provide: QueuedTrackRepository, useClass: QueuedTrackRepositoryAdapter }
  ]
})
export class NgCoreRadioInfrastructureQueuedTrackWebSocketModule {}
