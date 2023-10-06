import { TuiRootModule } from "@taiga-ui/core";
import { ApplicationConfig, importProvidersFrom, LOCALE_ID } from '@angular/core';
import { provideAnimations } from "@angular/platform-browser/animations";
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from "@angular/common";

registerLocaleData(localeFr, 'fr');
export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    importProvidersFrom(TuiRootModule),
    {provide: LOCALE_ID, useValue: 'fr'}
  ],
};
