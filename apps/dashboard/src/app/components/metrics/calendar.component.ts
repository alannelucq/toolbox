import { Component } from '@angular/core';
import { TuiCalendarModule } from "@taiga-ui/core";
import { TuiIslandModule } from "@taiga-ui/kit";
import { TuiBooleanHandler, TuiDay } from "@taiga-ui/cdk";


@Component({
  selector: 'toolbox-calendar',
  template: `
      <tui-island>
          <tui-calendar [disabledItemHandler]="disableCalendarHandler"/>
      </tui-island>
  `,
  styles: [
    `
        tui-island {
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
    `
  ],
  imports: [TuiCalendarModule, TuiIslandModule],
  standalone: true,
})

export class CalendarComponent {
  disableCalendarHandler: TuiBooleanHandler<TuiDay> = (day: TuiDay) => [0, 6].includes(new Date(day.year, day.month, day.day).getDay())

}
