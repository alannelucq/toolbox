import { TuiRootModule } from "@taiga-ui/core";
import { ApplicationConfig, importProvidersFrom, inject, LOCALE_ID } from '@angular/core';
import { provideAnimations } from "@angular/platform-browser/animations";
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from "@angular/common";
import { InMemoryDashboardGateway } from "./adapters/in-memory-dashboard.gateway";
import { MISSIONS } from "./missions.stub";
import { NgxsModule, Store } from "@ngxs/store";
import { DashboardState } from "./core/stores/dashboard/dashboard.state";
import { DashboardGateway } from "./core/ports/dashboard.gateway";
import { provideRouter, Routes } from "@angular/router";
import { RetrieveMissions } from "./core/stores/dashboard/dashboard.action";
import { TUI_FRENCH_LANGUAGE, TUI_LANGUAGE } from "@taiga-ui/i18n";
import { of } from "rxjs";

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./views/dashboard/dashboard.component'),
    resolve: {
      _: () => inject(Store).dispatch(new RetrieveMissions())
    }
  }
]

registerLocaleData(localeFr, 'fr');
export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(routes),
    importProvidersFrom(
      NgxsModule.forRoot([DashboardState]),
      TuiRootModule,
    ),
    {
      provide: TUI_LANGUAGE,
      useValue: of(TUI_FRENCH_LANGUAGE),
    },
    {provide: LOCALE_ID, useValue: 'fr'},
    {provide: DashboardGateway, useFactory: () => new InMemoryDashboardGateway().withMissions(MISSIONS)},
  ],
};
