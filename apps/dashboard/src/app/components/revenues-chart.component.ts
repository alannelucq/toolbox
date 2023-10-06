import { Component, signal, WritableSignal } from '@angular/core';
import { TuiAxesModule, TuiLineChartModule } from "@taiga-ui/addon-charts";
import { TuiPoint } from "@taiga-ui/core";
import { TuiIslandModule } from "@taiga-ui/kit";

@Component({
  selector: 'toolbox-revenues-chart',
  template: `
      <tui-island>
          <tui-axes
              [axisXLabels]="['Janv.', 'Fév.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.']"
              [axisYLabels]="['0', '2 500€', '5 000€', '7 500€', '10 000€', '12 500€', '15 000€']"
              [horizontalLines]="7"
              [verticalLines]="12"
          >
              <tui-line-chart
                  [filled]="true"
                  [height]="15000"
                  [smoothingFactor]="100"
                  [value]="revenues()"
                  [width]="550"
                  [x]="0"
                  [y]="0"
              ></tui-line-chart>
          </tui-axes>
      </tui-island>
  `,
  styles: [
    `
        tui-island, tui-axes {
            height: 100%;
            width: 600px;
            color: var(--tui-primary);
        }
    `

  ],
  standalone: true,
  imports: [
    TuiAxesModule,
    TuiLineChartModule,
    TuiIslandModule
  ]
})

export class RevenuesChartComponent {
  // TODO : Replace this stub with a real data source based on the mission's invoices
  readonly revenues: WritableSignal<TuiPoint[]> = signal([
    [0, 5000],
    [50, 7500],
    [100, 5000],
    [150, 12500],
    [200, 7350],
    [250, 7350],
    [300, 7350],
    [350, 7350],
    [400, 7350],
    [450, 10050],
    [500, 7350],
    [550, 7350],
  ]);
}
