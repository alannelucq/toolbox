import { Component } from '@angular/core';
import { RevenuesChartComponent } from "./revenues-chart.component";

@Component({
  selector: 'toolbox-metrics',
  template: `
      <toolbox-revenues-chart/>
  `,
  styles: [
    `
        :host {
            padding: 32px;
            /*border: 2px solid red;*/
        }
    `
  ],
  standalone: true,
  imports: [RevenuesChartComponent],
})

export class MetricsComponent {
}
