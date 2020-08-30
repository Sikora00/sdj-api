import { NgModule } from '@angular/core';
import { TrackRepositoryAdapter } from '@sdj/ng/core/radio/infrastructure-track-apollo';
import { environment } from '@sdj/ng/core/shared/domain';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { TrackRepository } from '@sdj/ng/core/radio/domain';

@NgModule({
  imports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: TrackRepository,
      useClass: TrackRepositoryAdapter
    },
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
export class NgCoreSharedInfrastructureApolloModule {}
