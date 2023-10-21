import { Component, inject } from '@angular/core';
import { MissionSummaryComponent } from "./components/mission-summary.component";
import { NgForOf } from "@angular/common";
import { MissionDetailComponent } from "./components/mission-detail.component";
import { MetricsComponent } from "./components/metrics/metrics.component";
import { toSignal } from "@angular/core/rxjs-interop";
import { Store } from "@ngxs/store";
import { DashboardSelectors } from "../../core/stores/dashboard/dashboard.selectors";
import { MissionSummary } from "../../core/models/mission-summary.model";

@Component({
  selector: 'toolbox-dashboard',
  template: `
      <toolbox-metrics/>
      <div class="missions-grid">
          <div class="missions-container">
              <toolbox-mission-summary *ngFor="let mission of missions()" [mission]="mission"/>
          </div>
          <toolbox-mission-detail/>
      </div>
  `,
  styles: [
    `
        :host {
            height: 100%;
            display: grid;
            grid-template-rows: 45% 55%;
        }

        .missions-grid {
            display: grid;
            grid-template-columns: 1fr 350px;
            padding: 24px;
        }

        .missions-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, 300px);
            grid-template-rows: repeat(auto-fill, 130px);
            gap: 16px;
        }
    `
  ],
  imports: [MissionSummaryComponent, NgForOf, MissionDetailComponent, MetricsComponent],
  standalone: true
})
export default class DashboardComponent {

  store = inject(Store);
  missions = toSignal(
    this.store.select(DashboardSelectors.summaries()),
    {initialValue: [] as MissionSummary[]}
  )
}
