import { NgModule } from '@angular/core';
import { TokenPersistenceService } from '@sdj/ng/auth/core/application-services';
import { LocalStorageTokenPersistenceService } from './token-persistance/local-storage-token-persistence.service';

@NgModule({
  providers: [
    {
      provide: TokenPersistenceService,
      useClass: LocalStorageTokenPersistenceService,
    },
  ],
})
export class NgAuthInfrastructureLocalStorageModule {}
