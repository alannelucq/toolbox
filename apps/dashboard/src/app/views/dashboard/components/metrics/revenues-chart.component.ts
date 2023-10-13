import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TuiAxesModule, TuiBarChartModule } from "@taiga-ui/addon-charts";
import { TuiHintModule } from "@taiga-ui/core";
import { TuiIslandModule } from "@taiga-ui/kit";

@Component({
  selector: 'toolbox-revenues-chart',
  template: `
      <tui-island [hoverable]="true">
          <tui-axes
              [axisXLabels]="['Janv.', 'Fév.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.']"
              [axisYLabels]="['0', '2 500€', '5 000€', '7 500€', '10 000€', '12 500€', '15 000€']"
              [horizontalLines]="6"
              [verticalLines]="12"
          >
              <tui-bar-chart
                  [value]="revenues()"
                  [max]="maxValue()"
              />
          </tui-axes>
      </tui-island>
  `,
  styles: [
    `
        tui-island, tui-axes {
            box-sizing: border-box;
            height: 100%;
            width: 100%;
            color: var(--tui-primary);
        }
    `

  ],
  standalone: true,
  imports: [
    TuiAxesModule,
    TuiIslandModule,
    TuiHintModule,
    TuiBarChartModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class RevenuesChartComponent {
  readonly revenues = signal([[5000, 6000, 7500, 5000, 12500, 7500, 5000, 7350, 7350, 7350, 10050, 12550]]);
  readonly maxValue = signal(Math.max(...this.revenues()[0]) + 2500);
}
