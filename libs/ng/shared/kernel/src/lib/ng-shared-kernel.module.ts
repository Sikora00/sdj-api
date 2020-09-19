import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { StoreRootModule } from './ngrx/state-root.module';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    RouterModule.forRoot([]),
    StoreRootModule,
  ],
  providers: [],
  exports: [RouterModule],
})
export class NgSharedKernelModule {}
