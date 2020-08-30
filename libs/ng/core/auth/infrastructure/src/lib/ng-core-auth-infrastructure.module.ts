import { NgModule } from '@angular/core';
import { TokenDataService } from '@sdj/ng/core/auth/application-services';
import { TokenRepositoryAdapter } from './token/token-repository.adapter';

@NgModule({
  providers: [{ provide: TokenDataService, useClass: TokenRepositoryAdapter }]
})
export class NgCoreAuthInfrastructureModule {}
