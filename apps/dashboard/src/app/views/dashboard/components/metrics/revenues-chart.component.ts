import { ChangeDetectionStrategy, Component, computed, Input, signal } from '@angular/core';
import { TuiAxesModule, TuiBarChartModule } from "@taiga-ui/addon-charts";
import { TuiHintModule } from "@taiga-ui/core";
import { TuiIslandModule } from "@taiga-ui/kit";

@Component({
  selector: 'toolbox-revenues-chart',
  template: `
      <tui-island [hoverable]="true">
          <tui-axes
              [axisXLabels]="['Janv.', 'Fév.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.']"
              [axisYLabels]="axisYLabels()"
              [horizontalLines]="horizontalLines()"
              [verticalLines]="12"
          >
              <tui-bar-chart
                  [value]="[values()]"
                  [max]="max()"
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
  @Input() set revenues(revenues: number[]) {
    this.values.set(revenues);
  }

  readonly values = signal([] as number[]);
  readonly max = computed(() => Math.max(...this.values()) + 1000);
  readonly horizontalLines = computed(() => Math.round(this.max() / 2500));
  readonly axisYLabels = computed(() => Array.from(
    {length: this.horizontalLines() + 1},
    (_, i) => `${i * 2500} €`)
  );
}
