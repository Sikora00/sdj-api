import { NgModule } from '@angular/core';
import { AuthDataService } from '@sdj/ng/auth/core/application-services';
import { HttpAuthDataService } from './token/http-auth-data.service';

@NgModule({
  providers: [{ provide: AuthDataService, useClass: HttpAuthDataService }],
})
export class NgAuthHttpInfrastructureModule {}
