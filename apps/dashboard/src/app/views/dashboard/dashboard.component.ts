import { Component, inject } from '@angular/core';
import { MissionSummaryComponent } from "./components/mission-summary.component";
import { NgForOf } from "@angular/common";
import { MissionDetailComponent } from "./components/mission-detail.component";
import { MetricsComponent } from "./components/metrics/metrics.component";
import DashboardHandler from "../../core/handlers/dashboard.handler";
import { toSignal } from "@angular/core/rxjs-interop";

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
            grid-template-rows: 1fr 2fr;
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
export class DashboardComponent {

  missions = toSignal(inject(DashboardHandler).retrieveMissions())
}
