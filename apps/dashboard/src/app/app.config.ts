import { TuiRootModule } from "@taiga-ui/core";
import { ApplicationConfig, importProvidersFrom, LOCALE_ID } from '@angular/core';
import { provideAnimations } from "@angular/platform-browser/animations";
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from "@angular/common";
import { InMemoryDashboardGateway } from "./core/adapters/in-memory-dashboard.gateway";
import { MISSIONS } from "./missions.stub";
import { DashboardGateway } from "./core/ports/dashboard.gateway";
import { NgxsModule } from "@ngxs/store";


registerLocaleData(localeFr, 'fr');
export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    importProvidersFrom(
      NgxsModule.forRoot([]),
      TuiRootModule
    ),
    {provide: LOCALE_ID, useValue: 'fr'},
    {provide: DashboardGateway, useFactory: () => new InMemoryDashboardGateway().withMissions(MISSIONS)},
  ],
};
