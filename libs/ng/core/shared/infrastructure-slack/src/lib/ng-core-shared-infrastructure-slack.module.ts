import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgCoreAuthApiModule } from '@sdj/ng/core/auth/api';
import { SlackService } from '@sdj/ng/core/shared/port';
import { ErrorInterceptor } from './error.interceptor';
import { SlackServiceAdapter } from './slack-service.adapter';
import { TokenInterceptor } from './token.interceptor';

@NgModule({
  imports: [HttpClientModule, NgCoreAuthApiModule],
  providers: [
    { provide: SlackService, useClass: SlackServiceAdapter },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ]
})
export class NgCoreSharedInfrastructureSlackModule {}
