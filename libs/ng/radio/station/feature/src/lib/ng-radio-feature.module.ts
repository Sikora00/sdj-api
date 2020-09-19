import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgRadioStationPresentationModule } from '@sdj/ng/radio/station/presentation';
import { PlayersModule } from '@sdj/ng/shared/presentation-players';
import { RadioComponent } from './containers/radio/radio.component';

@NgModule({
  imports: [
    CommonModule,
    PlayersModule,
    RouterModule.forChild([{ path: '', component: RadioComponent }]),
    NgRadioStationPresentationModule
  ],
  declarations: [RadioComponent]
})
export class NgRadioFeatureModule {}
