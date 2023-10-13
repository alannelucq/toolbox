import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TuiIslandModule } from "@taiga-ui/kit";
import { StubMissionBuilder } from "../../../core/models/builders/mission.builder";
import { ContactCardComponent } from "./contact.component";
import { CurrencyPipe, DatePipe, NgForOf, TitleCasePipe } from "@angular/common";
import { ContactBuilder } from "../../../core/models/builders/contact.builder";
import { StubInvoiceBuilder } from "../../../core/models/builders/invoice.builder";

@Component({
  selector: 'toolbox-mission-detail',
  template: `
      <tui-island [hoverable]="true">
          <p class="tui-island__category">Détail de la mission</p>
          <h2 class="tui-island__title">{{ mission().name }}</h2>
          <p class="tui-island__paragraph">{{ mission().description }}</p>
          <toolbox-contact-card
              [contact]="mission().contact"
              class="tui-space_top-4 tui-space_bottom-7"
          />
          <p class="tui-island__category tui-space_top-7 tui-space_bottom-0">Dernier TJM</p>
          <p class="tui-space_top-0">
              <span class="tui-island__title tui-space_top-0 daily-rate">
                  {{ lastInvoice().dailyRate | currency:'EUR' }}
              </span>
              <span class="tui-island__paragraph">({{ lastInvoice().month | date:'MMMM y' | titlecase }})</span>
          </p>
          <p class="tui-island__category">Compétences</p>
          <ul class="tui-list tui-list_small">
              <li class="tui-list__item" *ngFor="let skill of mission().skills">{{ skill }}</li>
          </ul>
      </tui-island>
  `,
  imports: [TuiIslandModule, ContactCardComponent, DatePipe, TitleCasePipe, CurrencyPipe, NgForOf],
  styles: [
    `
        tui-island {
            box-sizing: border-box;
            height: 100%;
            padding: 24px;

            .daily-rate {
                color: var(--tui-primary);
            }
        }
    `
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MissionDetailComponent {
  mission = signal(
    new StubMissionBuilder()
      .withId('XXX')
      .withName('-- --')
      .withContact(
        new ContactBuilder().withId('--').withName('John Doe').withEmail('john.doe@mail.com').withPhone('-- -- -- -- --').build()
      )
      .withInvoices([new StubInvoiceBuilder().build()])
      .withSkills(['--', '--', '--'])
      .build()
  );
  lastInvoice = signal(this.mission().invoices[this.mission().invoices.length - 1]);
}
