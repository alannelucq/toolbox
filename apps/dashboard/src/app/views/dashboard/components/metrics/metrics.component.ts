import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RevenuesChartComponent } from "./revenues-chart.component";
import { TuiIslandModule } from "@taiga-ui/kit";
import { MetricCardComponent } from "./metric-card.component";
import { TuiCalendarModule } from "@taiga-ui/core";
import { CalendarComponent } from "./calendar.component";
import { toSignal } from "@angular/core/rxjs-interop";
import { DashboardSelector } from "../../../../core/stores/dashboard/dashboard.selector";
import { Store } from "@ngxs/store";
import { CurrencyPipe } from "@angular/common";

@Component({
  selector: 'toolbox-metrics',
  template: `
      <toolbox-revenues-chart [revenues]="metrics()?.revenues ??  []"/>
      <div class="cards">
          <toolbox-metric-card
              label="Chiffre d'affaires"
              [value]="(metrics()?.totalRevenues ?? '') | currency:'EUR':'symbol':'1.0-0'"
          />
          <toolbox-metric-card
              label="Jours facturés"
              [value]="metrics()?.totalWorkedDaysCount ?? '--'"
          />
      </div>
      <toolbox-calendar/>
  `,
  styles: [
    `
        :host {
            /*filter: blur(10px);*/
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
  imports: [RevenuesChartComponent, TuiIslandModule, MetricCardComponent, TuiCalendarModule, CalendarComponent, CurrencyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MetricsComponent {
  metrics = toSignal(inject(Store).select(DashboardSelector.metrics()));
}
