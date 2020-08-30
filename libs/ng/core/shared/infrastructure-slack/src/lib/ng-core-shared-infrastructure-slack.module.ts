import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SlackService } from '@sdj/ng/core/shared/application-services';
import { ErrorInterceptor } from './error.interceptor';
import { SlackServiceAdapter } from './slack-service.adapter';
import { TokenInterceptor } from './token.interceptor';

@NgModule({
  imports: [HttpClientModule],
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
