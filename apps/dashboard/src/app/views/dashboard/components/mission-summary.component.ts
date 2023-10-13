import { booleanAttribute, ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TuiAvatarModule, TuiIslandModule } from "@taiga-ui/kit";
import { MissionSummary } from "../../../core/models/mission-summary.model";
import { NgClass } from "@angular/common";

@Component({
  selector: 'toolbox-mission-summary',
  template: `
      <tui-island [hoverable]="true" size="m" [class.selected]="mission.selected">
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
    TuiAvatarModule,
    NgClass
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MissionSummaryComponent {
  @Input({required: true}) mission: MissionSummary;
  @Input({transform: booleanAttribute}) selected = false;
}
