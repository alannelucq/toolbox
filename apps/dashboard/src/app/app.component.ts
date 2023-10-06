import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { TUI_SANITIZER, TuiAlertModule, TuiDialogModule, TuiRootModule } from "@taiga-ui/core";
import { Component } from '@angular/core';
import { NxWelcomeComponent } from './nx-welcome.component';
import { DashboardComponent } from "./dashboard.component";

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, TuiRootModule, TuiDialogModule, TuiAlertModule, DashboardComponent],
  selector: 'toolbox-root',
  template: `
      <tui-root>
          <toolbox-dashboard/>
      </tui-root>
  `,
  styles: [
    `tui-root {
        height: 100%;
        background: var(--tui-base-02);
    }`
  ],
  providers: [{provide: TUI_SANITIZER, useClass: NgDompurifySanitizer}]
})
export class AppComponent {
}
