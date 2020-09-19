import { NgModule } from '@angular/core';
import { RadioDataService } from '@sdj/ng/radio/core/application-services';
import { RadioDataServiceAdapter } from './radio-data.service.adapter';

@NgModule({
  providers: [{ provide: RadioDataService, useClass: RadioDataServiceAdapter }]
})
export class NgRadioInfrastructureRadioWsModule {}
