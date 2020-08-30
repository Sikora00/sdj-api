import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgCoreRadioShellModule } from '@sdj/ng/core/radio/shell';
import { NgPresentationMainRadioPresentationModule } from '@sdj/ng/presentation/main/radio/presentation';
import { PlayersModule } from '@sdj/ng/presentation/shared/presentation-players';
import { RadioComponent } from './containers/radio/radio.component';

@NgModule({
  imports: [
    CommonModule,
    NgCoreRadioShellModule,
    PlayersModule,
    RouterModule.forChild([{ path: '', component: RadioComponent }]),
    NgPresentationMainRadioPresentationModule
  ],
  declarations: [RadioComponent]
})
export class NgRadioFeatureModule {}
