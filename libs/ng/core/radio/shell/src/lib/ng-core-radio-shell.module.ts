import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgCoreRadioApplicationServicesModule } from '@sdj/ng/core/radio/application-services';
import {
  QueuedTrackRepository,
  TrackRepository
} from '@sdj/ng/core/radio/domain-services';
import { QueuedTrackRepositoryAdapter } from '@sdj/ng/core/radio/infrastructure';
import { SpeechServiceAdapter } from '@sdj/ng/core/shared/infrastructure-speech';
import { WebSocketClientAdapter } from '@sdj/ng/core/shared/infrastructure-web-socket';
import { SpeechService, WebSocketClient } from '@sdj/ng/core/shared/port';
import { TrackRepositoryAdapter } from '@sdj/ng/core/radio/infrastructure';

@NgModule({
  imports: [CommonModule, NgCoreRadioApplicationServicesModule],
  providers: [
    { provide: SpeechService, useClass: SpeechServiceAdapter },
    {
      provide: QueuedTrackRepository,
      useClass: QueuedTrackRepositoryAdapter
    },
    {
      provide: TrackRepository,
      useClass: TrackRepositoryAdapter
    },
    { provide: WebSocketClient, useExisting: WebSocketClientAdapter }
  ]
})
export class NgCoreRadioShellModule {}
