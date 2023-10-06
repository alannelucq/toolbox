import { Component } from '@angular/core';
import { MissionSummaryCardComponent } from "./components/mission-summary-card.component";
import { StubMissionBuilder } from "./core/models/builders/mission.builder";
import { NgForOf } from "@angular/common";
import { MissionDetailComponent } from "./components/mission-detail.component";
import { MetricsComponent } from "./components/metrics.component";

@Component({
  selector: 'toolbox-dashboard',
  template: `
      <toolbox-metrics/>
      <div class="missions-grid">
          <div class="missions-container">
              <toolbox-mission-summary-card *ngFor="let mission of missions" [mission]="mission"/>
          </div>
          <toolbox-mission-detail/>
      </div>

  `,
  styles: [
    `
        :host {
            height: 100%;
            display: grid;
            grid-template-rows: 2fr 3fr;

            .missions-grid {
                display: grid;
                grid-template-columns: 1fr 350px;

                & > * {
                    height: 100%;
                    padding: 32px;
                }
            }
        ;

            .missions-container {
                /*justify-content: center;*/
                display: grid;
                grid-template-columns: repeat(auto-fill, 300px);
                grid-template-rows: repeat(auto-fill, 120px);
                gap: 16px;
            }
        }
    `
  ],
  imports: [MissionSummaryCardComponent, NgForOf, MissionDetailComponent, MetricsComponent],
  standalone: true
})
export class DashboardComponent {

  missions = [
    new StubMissionBuilder()
      .withName("Elazur")
      .withDescription("Lead Dev Fullstack")
      .build(),
    new StubMissionBuilder()
      .withName("Oreco")
      .withDescription("Lead Dev Front-end")
      .build(),
    new StubMissionBuilder()
      .withName("Octoplus Consulting")
      .withDescription("Développeur Fullstack")
      .build(),
    new StubMissionBuilder()
      .withName("BPI")
      .withDescription("Lead Dev Front-end")
      .build(),
    new StubMissionBuilder()
      .withName("Mesetys")
      .withDescription("Lead Dev Front-end")
      .build()
  ];
}
