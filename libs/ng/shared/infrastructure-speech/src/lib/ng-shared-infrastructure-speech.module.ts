import { NgModule } from '@angular/core';
import { SpeechService } from '@sdj/ng/shared/core/application-services';
import { SpeechServiceAdapter } from './speech-service.adapter';

@NgModule({
  providers: [{ provide: SpeechService, useClass: SpeechServiceAdapter }],
})
export class NgSharedInfrastructureSpeechModule {}
