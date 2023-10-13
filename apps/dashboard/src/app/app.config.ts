import { TuiRootModule } from "@taiga-ui/core";
import { ApplicationConfig, importProvidersFrom, LOCALE_ID } from '@angular/core';
import { provideAnimations } from "@angular/platform-browser/animations";
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from "@angular/common";
import DashboardHandler from "./core/handlers/dashboard.handler";
import { InMemoryDashboardGateway } from "./adapters/in-memory-dashboard.gateway";
import { MISSIONS } from "./missions.stub";
import { NgxsModule } from "@ngxs/store";
import { DashboardState } from "./core/stores/dashboard/dashboard.state";


registerLocaleData(localeFr, 'fr');
export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    importProvidersFrom(
      NgxsModule.forRoot([DashboardState]),
      TuiRootModule
    ),
    {provide: LOCALE_ID, useValue: 'fr'},
    {provide: DashboardHandler, useValue: new DashboardHandler(new InMemoryDashboardGateway().withMissions(MISSIONS))},
  ],
};
