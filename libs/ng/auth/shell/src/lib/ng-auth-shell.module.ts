import { NgModule } from '@angular/core';
import { NgAuthCoreApplicationServicesModule } from '@sdj/ng/auth/core/application-services';
import { NgAuthHttpInfrastructureModule } from '@sdj/ng/auth/http-infrastructure';
import { NgAuthInfrastructureLocalStorageModule } from '@sdj/ng/auth/infrastructure-local-storage';

@NgModule({
  imports: [
    NgAuthHttpInfrastructureModule,
    NgAuthInfrastructureLocalStorageModule,
    NgAuthCoreApplicationServicesModule,
  ],
})
export class NgAuthShellModule {}
