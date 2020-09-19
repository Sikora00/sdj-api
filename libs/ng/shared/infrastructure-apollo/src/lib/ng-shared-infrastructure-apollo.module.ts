import { NgModule } from '@angular/core';
import { environment } from '@sdj/ng/shared/core/domain';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

@NgModule({
  imports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: environment.backendUrl + 'graphql'
          })
        };
      },
      deps: [HttpLink]
    }
  ]
})
export class NgSharedInfrastructureApolloModule {}
