import { NgModule } from '@angular/core';
import { NgCoreSharedKernelModule } from '@sdj/ng/core/shared/kernel';
import { NgPresentationMainFeatureModule } from '@sdj/ng/presentation/main/feature';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [NgPresentationMainFeatureModule, NgCoreSharedKernelModule],

  bootstrap: [AppComponent]
})
export class AppModule {}
