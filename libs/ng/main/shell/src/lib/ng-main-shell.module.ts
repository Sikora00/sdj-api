import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Route, RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgAuthShellModule } from '@sdj/ng/auth/shell';
import { NgRadioCoreApplicationServicesModule } from '@sdj/ng/radio/core/application-services';
import { ChannelFacade } from '@sdj/ng/radio/core/domain';
import { NgRadioInfrastructureChannelHttpModule } from '@sdj/ng/radio/infrastructure-channel-http';
import { NgRadioInfrastructureChannelPersistenceNgrxEntityModule } from '@sdj/ng/radio/infrastructure-channel-persistence-ngrx-entity';
import { NgRadioInfrastructureQueuedTrackWebSocketModule } from '@sdj/ng/radio/infrastructure-queued-track-web-socket';
import { NgRadioInfrastructureRadioWsModule } from '@sdj/ng/radio/infrastructure-radio-ws';
import { NgRadioInfrastructureTrackApolloModule } from '@sdj/ng/radio/infrastructure-track-apollo';
import { NgSharedInfrastructureApolloModule } from '@sdj/ng/shared/infrastructure-apollo';
import { NgSharedInfrastructureSpeechModule } from '@sdj/ng/shared/infrastructure-speech';
import { NgSharedInfrastructureWsSocketIoModule } from '@sdj/ng/shared/infrastructure-ws-socket-io';
import { MAIN_FEATURE_KEY, reducer } from './application/+state/main.reducer';
import { NgrxMainFacade } from './application/ngrx-main.facade';
import { LoadChannelsHandler } from './application/queries/load-channels/load-channels.handler';
import { SelectChannelService } from './application/services/select-channel.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { MainComponent } from './containers/main/main.component';
import { ChannelResolver } from './resolvers/channel.resolver';

export const ngShellRoutes: Route[] = [
  {
    path: '',
    resolve: {
      channel: ChannelResolver,
    },
    children: [
      {
        component: MainComponent,
        path: '',
      },
      {
        component: MainComponent,
        path: ':channelId',
        children: [
          {
            loadChildren: () =>
              import('@sdj/ng/radio/station/feature').then(
                (module) => module.NgRadioFeatureModule
              ),
            path: '',
          },
          {
            loadChildren: () =>
              import('@sdj/ng/radio/most-played/feature').then(
                (module) => module.NgMostPlayedFeatureModule
              ),
            path: 'most-played',
          },
          {
            loadChildren: () =>
              import('@sdj/ng/radio/top-rated/feature').then(
                (module) => module.NgTopRatedFeatureModule
              ),
            path: 'top-rated',
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ngShellRoutes),
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatSidenavModule,
    MatButtonModule,
    NgAuthShellModule,
    NgRadioInfrastructureRadioWsModule,
    NgRadioCoreApplicationServicesModule,
    NgRadioInfrastructureQueuedTrackWebSocketModule,
    NgSharedInfrastructureApolloModule,
    NgSharedInfrastructureWsSocketIoModule,
    NgRadioInfrastructureChannelHttpModule,
    NgSharedInfrastructureSpeechModule,
    NgRadioInfrastructureTrackApolloModule,
    EffectsModule.forFeature([LoadChannelsHandler]),
    StoreModule.forFeature(MAIN_FEATURE_KEY, reducer),
    NgRadioInfrastructureChannelPersistenceNgrxEntityModule,
  ],
  declarations: [NavbarComponent, MainComponent, SidenavComponent],
  providers: [
    ChannelResolver,
    {
      provide: ChannelFacade,
      useClass: NgrxMainFacade,
    },
    SelectChannelService,
  ],
})
export class NgMainShellModule {}
