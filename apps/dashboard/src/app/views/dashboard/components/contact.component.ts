import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Contact } from "../../../core/models/contact.model";
import { TuiAvatarModule, TuiIslandModule } from "@taiga-ui/kit";
import { TuiSvgModule } from "@taiga-ui/core";

@Component({
  selector: 'toolbox-contact-card',
  template: `
      <tui-avatar size="l" [text]="contact.firstName + ' ' + contact.lastName" [rounded]="true"/>
      <div class="infos">
          <p class="title">{{ contact.firstName + ' ' + contact.lastName }}</p>
          <p class="mail">{{ contact.email }}</p>
          <p class="phone">{{ contact.phone }}</p>
      </div>
  `,
  styles: [
    `
        :host {
            display: flex;
            align-items: center;
            gap: 16px;
        }

        p {
            margin: 0;
            display: flex;
            align-items: center;

            &.title {
                font-weight: 400;
            }

            &.mail, &.phone {
                font-weight: 100;
                font-size: 0.9rem;
                line-height: 1.2rem;
                color: var(--tui-text-02);
            }
        }
    `
  ],
  standalone: true,
  imports: [TuiIslandModule, TuiAvatarModule, TuiSvgModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ContactCardComponent {
  @Input({required: true}) contact: Contact;
}
