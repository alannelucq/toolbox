import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RevenuesChartComponent } from "./revenues-chart.component";
import { TuiIslandModule } from "@taiga-ui/kit";
import { MetricCardComponent } from "./metric-card.component";
import { TuiCalendarModule } from "@taiga-ui/core";
import { CalendarComponent } from "./calendar.component";

@Component({
  selector: 'toolbox-metrics',
  template: `
      <toolbox-revenues-chart/>
      <div class="cards">
          <toolbox-metric-card label="Chiffre d'affaires" value="-- €"/>
          <toolbox-metric-card label="Jours facturés" value="--"/>
      </div>
      <toolbox-calendar/>

  `,
  styles: [
    `
        :host {
            filter: blur(10px);
            padding: 24px;
            display: grid;
            grid-template-columns: 2fr 1fr 1fr;
            gap: 16px;

            .cards {
                display: grid;
                grid-template-rows: 1fr 1fr;
                gap: 16px;
            }
        }
    `
  ],
  standalone: true,
  imports: [RevenuesChartComponent, TuiIslandModule, MetricCardComponent, TuiCalendarModule, CalendarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MetricsComponent {
}
