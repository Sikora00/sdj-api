import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// tslint:disable-next-line:nx-enforce-module-boundaries
import { environment } from '@sdj/ng/shared/core/domain';

import { AppModule } from './app/app.module';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  // tslint:disable-next-line: no-console
  .catch(err => console.error(err));
