import { NgModule } from '@angular/core';
import { TokenDataService } from '@sdj/ng/auth/core/application-services';
import { HttpTokenDataService } from './token/http-token-data.service';

@NgModule({
  providers: [{ provide: TokenDataService, useClass: HttpTokenDataService }]
})
export class NgAuthHttpInfrastructureModule {}
