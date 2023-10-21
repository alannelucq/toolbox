import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { TuiButtonModule } from "@taiga-ui/core";
import { TuiInputMonthModule, TuiInputNumberModule, TuiIslandModule, TuiSelectModule } from "@taiga-ui/kit";
import { TuiMonth, TuiStringHandler, TuiValueChangesModule } from "@taiga-ui/cdk";
import { FormsModule } from "@angular/forms";
import { InvoiceOption } from "../../../../core/models/invoice-option.model";
import { FormDirective } from "../../../../shared/directives/form.directive";
import { Store } from "@ngxs/store";
import { toSignal } from "@angular/core/rxjs-interop";
import { DashboardSelectors } from "../../../../core/stores/dashboard/dashboard.selectors";

interface AddInvoiceFormModel {
  mission: InvoiceOption;
  month: TuiMonth;
  workedDaysCount: number;
  dailyRate: number;
}

@Component({
  selector: 'toolbox-invoice-form',
  template: `
      <tui-island [hoverable]="true">
          <form (formValueChange)="formValue.set($event)" (ngSubmit)="sendInvoice()">
              <tui-select
                  name="mission"
                  [ngModel]="formValue().mission"
                  [stringify]="stringify"
                  (tuiValueChanges)="computeDailyRate($event)"
              >
                  Sélectionnez une mission
                  <select tuiSelect [items]="options()"></select>
              </tui-select>
              <tui-input-month name="month" [ngModel]="formValue().month">
                  Mois à facturer
                  <input tuiTextfield/>
              </tui-input-month>
              <tui-input-number name="dailyRate" [ngModel]="formValue().dailyRate">TJM</tui-input-number>
              <tui-input-number name="workedDaysCount" [ngModel]="formValue().workedDaysCount">
                  Nombre de jours facturés
              </tui-input-number>
              <button tuiButton type="submit">Envoyer la facture</button>
          </form>
      </tui-island>
  `,
  styles: [
    `
        tui-island {
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        form {
            display: flex;
            flex-direction: column;
            gap: 16px;
            padding: 16px;
            width: 100%;
        }
    `
  ],
  imports: [TuiIslandModule, TuiSelectModule, FormsModule, FormDirective, TuiValueChangesModule, TuiInputMonthModule, TuiInputNumberModule, TuiButtonModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class InvoiceFormComponent {
  private store = inject(Store);

  formValue = signal<AddInvoiceFormModel>({} as AddInvoiceFormModel);
  isFormValid = computed(
    () => this.formValue().mission && this.formValue().month && this.formValue().workedDaysCount && this.formValue().dailyRate
  );

  options = toSignal(this.store.select(DashboardSelectors.invoiceOptions()), {initialValue: [] as InvoiceOption[]});
  stringify: TuiStringHandler<InvoiceOption> = option => option.name;

  computeDailyRate(option: InvoiceOption) {
    if (!option) return;
    this.formValue.update(form => ({...form, dailyRate: option.lastDailyRate}));
  }

  sendInvoice() {
    if (!this.isFormValid()) return;
    const {mission: {id: missionId}, month, dailyRate, workedDaysCount} = this.formValue()
    const invoice = {
      missionId,
      dailyRate,
      month: month.toLocalNativeDate(),
      workedDaysCount
    }
    // TODO : Dispatch an action to send invoice
  }
}
