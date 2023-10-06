import { booleanAttribute, ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TuiAvatarModule, TuiIslandModule } from "@taiga-ui/kit";
import { Mission } from "../core/models/mission.model";

@Component({
  selector: 'toolbox-mission-summary-card',
  template: `
      <tui-island [hoverable]="true" [class.selected]="selected" size="m">
          <div class="row">
              <tui-avatar size="m" [text]="mission.name" [rounded]="true"/>
              <div>
                  <h3 class="tui-island__title">{{ mission.name }}</h3>
                  <p class="tui-island__paragraph">{{ mission.role }}</p>
              </div>
          </div>
      </tui-island>
  `,
  styles: [
    `
        tui-island {
            box-sizing: border-box;
            height: 120px;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        .selected {
            border: 2px solid var(--tui-primary);
        }

        .row {
            display: flex;
            align-items: center;
            gap: 16px
        }
    `
  ],
  imports: [
    TuiIslandModule,
    TuiAvatarModule
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MissionSummaryCardComponent {
  @Input({required: true}) mission: Mission;
  @Input({transform: booleanAttribute}) selected = false;
}
