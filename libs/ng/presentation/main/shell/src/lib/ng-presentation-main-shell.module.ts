import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Route, RouterModule } from '@angular/router';
import { NgCoreAuthShellModule } from '@sdj/ng/core/auth/shell';
import { NgCoreRadioShellModule } from '@sdj/ng/core/radio/shell';
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
      channel: ChannelResolver
    },
    children: [
      {
        component: MainComponent,
        path: ''
      },
      {
        component: MainComponent,
        path: ':channelId',
        children: [
          {
            loadChildren: () =>
              import('@sdj/ng/presentation/main/radio/feature').then(
                module => module.NgRadioFeatureModule
              ),
            path: ''
          },
          {
            loadChildren: () =>
              import('@sdj/ng/presentation/main/most-played/feature').then(
                module => module.NgMostPlayedFeatureModule
              ),
            path: 'most-played'
          },
          {
            loadChildren: () =>
              import('@sdj/ng/presentation/main/top-rated/feature').then(
                module => module.NgTopRatedFeatureModule
              ),
            path: 'top-rated'
          }
        ]
      }
    ]
  }
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
    NgCoreAuthShellModule,
    NgCoreRadioShellModule
  ],
  declarations: [NavbarComponent, MainComponent, SidenavComponent],
  providers: [ChannelResolver]
})
export class NgPresentationMainShellModule {}
