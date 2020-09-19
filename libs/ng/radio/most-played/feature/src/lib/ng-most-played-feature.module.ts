import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgSharedUiSdjLoaderModule } from '@sdj/ng/shared/presentation-sdj-loader';
import { NgxAudioPlayerModule } from 'ngx-audio-player';
import { MostPlayedComponent } from './containers/most-played/most-played.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: MostPlayedComponent }]),
    NgxAudioPlayerModule,
    NgSharedUiSdjLoaderModule
  ],
  declarations: [MostPlayedComponent]
})
export class NgMostPlayedFeatureModule {}
