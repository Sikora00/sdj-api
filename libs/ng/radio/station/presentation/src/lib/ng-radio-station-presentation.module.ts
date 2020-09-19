import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RadioActionMenuComponent } from './radio-action-menu/radio-action-menu.component';
import { RadioStationsComponent } from './radio-stations/radio-stations.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatDialogModule
  ],
  exports: [RadioActionMenuComponent],
  declarations: [RadioActionMenuComponent, RadioStationsComponent]
})
export class NgRadioStationPresentationModule {}
