import { NgModule } from '@angular/core';
import { NgSharedKernelModule } from '@sdj/ng/shared/kernel';
import { NgMainShellModule } from '@sdj/ng/main/shell';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [NgMainShellModule, NgSharedKernelModule],

  bootstrap: [AppComponent],
})
export class AppModule {}
