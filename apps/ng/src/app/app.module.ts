import { NgModule } from '@angular/core';
import { NgMainShellModule } from '@sdj/ng/main/shell';
import { NgSharedKernelModule } from '@sdj/ng/shared/kernel';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [NgMainShellModule, NgSharedKernelModule],

  bootstrap: [AppComponent],
})
export class AppModule {}
