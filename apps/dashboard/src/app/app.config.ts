import { providerAnimation } from "@angular/platform-browser/animations";
import { TuiRootModule } from "@taiga-ui/core";
import { ApplicationConfig, importProvidersFrom } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [providerAnimation(), importProvidersFrom(TuiRootModule)],
};
