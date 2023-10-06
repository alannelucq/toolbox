import { Component } from '@angular/core';
import { MissionCardComponent } from "./components/mission-card.component";
import { StubMissionBuilder } from "./core/models/builders/mission.builder";
import { NgForOf } from "@angular/common";

@Component({
  selector: 'toolbox-dashboard',
  template: `
      <div>Metrics</div>
      <div class="missions-container">
          <toolbox-mission-card
              *ngFor="let mission of missions"
              [mission]="mission"
          />
      </div>
  `,
  styles: [
    `
        :host {
            height: 100%;
            display: grid;
            grid-template-rows: 1fr 2fr;

            & > * {
                border: 2px solid blue;
            }

            .missions-container {
                justify-content: center;
                display: grid;
                grid-template-columns: repeat(auto-fill, 300px);
                grid-template-rows: repeat(auto-fill, 120px);
                padding: 32px;
                gap: 16px;
            }
        }
    `
  ],
  imports: [MissionCardComponent, NgForOf],
  standalone: true
})
export class DashboardComponent {

  missions = [
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
