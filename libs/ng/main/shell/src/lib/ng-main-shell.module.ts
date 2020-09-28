import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Route, RouterModule } from '@angular/router';
import { NgAuthCoreApplicationServicesModule } from '@sdj/ng/auth/core/application-services';
import { NgAuthHttpInfrastructureModule } from '@sdj/ng/auth/http-infrastructure';
import { NgRadioCoreApplicationServicesModule } from '@sdj/ng/radio/core/application-services';
import { NgRadioInfrastructureChannelHttpModule } from '@sdj/ng/radio/infrastructure-channel-http';
import { NgRadioInfrastructureQueuedTrackWebSocketModule } from '@sdj/ng/radio/infrastructure-queued-track-web-socket';
import { NgRadioInfrastructureRadioWsModule } from '@sdj/ng/radio/infrastructure-radio-ws';
import { NgRadioInfrastructureTrackApolloModule } from '@sdj/ng/radio/infrastructure-track-apollo';
import { NgSharedInfrastructureApolloModule } from '@sdj/ng/shared/infrastructure-apollo';
import { NgSharedInfrastructureSpeechModule } from '@sdj/ng/shared/infrastructure-speech';
import { NgSharedInfrastructureWsSocketIoModule } from '@sdj/ng/shared/infrastructure-ws-socket-io';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { MainComponent } from './containers/main/main.component';
import { AuthGuard } from './guards/auth.guard';
import { ChannelResolver } from './resolvers/channel.resolver';

export const ngShellRoutes: Route[] = [
  {
    path: '',
    canActivate: [AuthGuard],
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
    NgAuthCoreApplicationServicesModule,
    NgAuthHttpInfrastructureModule,
    NgRadioInfrastructureRadioWsModule,
    NgRadioCoreApplicationServicesModule,
    NgRadioInfrastructureQueuedTrackWebSocketModule,
    NgSharedInfrastructureApolloModule,
    NgSharedInfrastructureWsSocketIoModule,
    NgRadioInfrastructureChannelHttpModule,
    NgSharedInfrastructureSpeechModule,
    NgRadioInfrastructureTrackApolloModule,
  ],
  declarations: [NavbarComponent, MainComponent, SidenavComponent],
  providers: [ChannelResolver],
})
export class NgMainShellModule {}
