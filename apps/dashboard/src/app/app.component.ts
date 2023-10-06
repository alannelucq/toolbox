import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { TuiRootModule, TuiDialogModule, TuiAlertModule, TUI_SANITIZER } from "@taiga-ui/core";
import { Component } from '@angular/core';
import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, TuiRootModule, TuiDialogModule, TuiAlertModule],
  selector: 'toolbox-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
        providers: [{provide: TUI_SANITIZER, useClass: NgDompurifySanitizer}]
    })
export class AppComponent {
  title = 'dashboard';
}
