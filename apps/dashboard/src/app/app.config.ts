import { TuiRootModule } from "@taiga-ui/core";
import { ApplicationConfig, importProvidersFrom, LOCALE_ID } from '@angular/core';
import { provideAnimations } from "@angular/platform-browser/animations";
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from "@angular/common";
import DashboardHandler from "./core/handlers/dashboard.handler";
import { InMemoryDashboardGateway } from "./adapters/in-memory-dashboard.gateway";
import { MISSIONS } from "./missions.stub";


registerLocaleData(localeFr, 'fr');
export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    importProvidersFrom(TuiRootModule),
    {provide: LOCALE_ID, useValue: 'fr'},
    {provide: DashboardHandler, useValue: new DashboardHandler(new InMemoryDashboardGateway().withMissions(MISSIONS))},
  ],
};
