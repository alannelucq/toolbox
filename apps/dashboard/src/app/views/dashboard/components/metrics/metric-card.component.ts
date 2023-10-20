import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TuiIslandModule } from "@taiga-ui/kit";

@Component({
  selector: 'toolbox-metric-card',
  template: `
      <tui-island [hoverable]="true">
          <p class="figure">{{ value ?? '--' }}</p>
          <p class="label">{{ label}}</p>
      </tui-island>
  `,
  styles: [
    `
        tui-island {
            height: 100%;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 16px;

            .figure {
                font-size: 2.5rem;
                font-weight: 500;

            }

            .label {
                text-transform: uppercase;
                font-size: 0.8rem;
                color: var(--tui-base-07);
            }
        }

        p {
            margin: 0;
        }
    `
  ],
  imports: [TuiIslandModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MetricCardComponent {
  @Input({required: true}) label: string;
  @Input({required: true}) value: string | number | null;
}
