import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { MainAppModule } from './app/main-app.module';


platformBrowserDynamic().bootstrapModule(MainAppModule)
  .catch(err => console.error(err));
