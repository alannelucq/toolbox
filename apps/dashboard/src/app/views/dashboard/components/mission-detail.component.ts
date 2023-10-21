import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { TuiIslandModule } from "@taiga-ui/kit";
import { ContactCardComponent } from "./contact.component";
import { CurrencyPipe, DatePipe, NgForOf, NgIf, TitleCasePipe } from "@angular/common";
import { toSignal } from "@angular/core/rxjs-interop";
import { Store } from "@ngxs/store";
import { DashboardSelectors } from "../../../core/stores/dashboard/dashboard.selectors";
import { MissionDetail } from "../../../core/models/mission-detail.model";

@Component({
  selector: 'toolbox-mission-detail',
  template: `
      <tui-island [hoverable]="true">
          <ng-container *ngIf="detail() as detail; else empty">
              <p class="tui-island__category">Détail de la mission</p>
              <h2 class="tui-island__title">{{ detail.name }}</h2>
              <p class="tui-island__paragraph">{{ detail.description }}</p>
              <toolbox-contact-card
                  [contact]="detail.contact"
                  class="tui-space_top-4 tui-space_bottom-7"
              />
              <p class="tui-island__category tui-space_top-7 tui-space_bottom-0">Dernier TJM</p>
              <p class="tui-space_top-0">
              <span class="tui-island__title tui-space_top-0 daily-rate">
                  {{ detail.lastInvoice.dailyRate | currency:'EUR' }}
              </span>
                  <span class="tui-island__paragraph">({{ detail.lastInvoice.month | date:'MMMM y' | titlecase }}
                      )</span>
              </p>
              <p class="tui-island__category">Compétences</p>
              <ul class="tui-list tui-list_small">
                  <li class="tui-list__item" *ngFor="let skill of detail.skills">{{ skill }}</li>
              </ul>
          </ng-container>
          <ng-template #empty>
              <div class="empty">
                  Sélectionnez une mission pour afficher son détail.
              </div>
          </ng-template>
      </tui-island>
  `,
  imports: [TuiIslandModule, ContactCardComponent, DatePipe, TitleCasePipe, CurrencyPipe, NgForOf, NgIf],
  styles: [
    `
        tui-island {
            box-sizing: border-box;
            height: 100%;
            padding: 24px;

            .daily-rate {
                color: var(--tui-primary);
            }

            .empty {
                display: flex;
                align-items: center;
                justify-content: center;
                text-align: center;
                height: 100%;
                width: 70%;
                margin: 0 auto;
            }
        }
    `
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MissionDetailComponent {
  detail: Signal<MissionDetail | null> = toSignal(inject(Store).select(DashboardSelectors.selectedMissionDetail()), {initialValue: null});
}
