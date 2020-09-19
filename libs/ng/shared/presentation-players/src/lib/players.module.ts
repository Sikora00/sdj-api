import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgSharedUiSdjLoaderModule } from '@sdj/ng/shared/presentation-sdj-loader';
import { AwesomePlayerComponent } from './components/awesome-player/awesome-player.component';

@NgModule({
  imports: [CommonModule, NgSharedUiSdjLoaderModule],
  declarations: [AwesomePlayerComponent],
  exports: [AwesomePlayerComponent]
})
export class PlayersModule {}
