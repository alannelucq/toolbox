import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TuiAlertService, TuiButtonModule } from "@taiga-ui/core";
import { TuiInputMonthModule, TuiInputNumberModule, TuiIslandModule, TuiSelectModule } from "@taiga-ui/kit";
import { TuiMonth, TuiStringHandler, TuiValueChangesModule } from "@taiga-ui/cdk";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Actions, ofActionSuccessful, Store } from "@ngxs/store";
import { takeUntilDestroyed, toSignal } from "@angular/core/rxjs-interop";
import { DashboardSelector } from "../../../../core/stores/dashboard/dashboard.selector";
import { InvoiceOption } from "../../../../core/models/invoice-option.model";
import { InvoiceSent, SendInvoice } from "../../../../core/stores/dashboard/dashboard.action";
import { AddInvoiceRequest } from "../../../../core/models/add-invoice-request.model";
import { switchMap, tap } from "rxjs";


@Component({
  selector: 'toolbox-add-invoice',
  template: `
      <tui-island [hoverable]="true">
          <form [formGroup]="form" (ngSubmit)="sendInvoice()">
              <tui-select
                  formControlName="mission"
                  [stringify]="stringify"
                  (tuiValueChanges)="computeDailyRate($event)"
              >
                  Sélectionnez une mission
                  <select tuiSelect [items]="options()"></select>
              </tui-select>
              <tui-input-month formControlName="month">
                  Mois à facturer
                  <input tuiTextfield/>
              </tui-input-month>
              <tui-input-number formControlName="dailyRate">TJM</tui-input-number>
              <tui-input-number formControlName="workedDaysCount">Nombre de jours facturés</tui-input-number>
              <button tuiButton type="submit" [showLoader]="loading()">Envoyer la facture</button>
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
  imports: [TuiIslandModule, TuiSelectModule, ReactiveFormsModule, TuiValueChangesModule, TuiInputMonthModule, TuiInputNumberModule, TuiButtonModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AddInvoiceComponent {
  store = inject(Store);
  actions$ = inject(Actions);
  alertService = inject(TuiAlertService);

  form = new FormGroup({
    mission: new FormControl<InvoiceOption | null>(null, Validators.required),
    dailyRate: new FormControl<number | null>(null, Validators.required),
    month: new FormControl<TuiMonth | null>(null, Validators.required),
    workedDaysCount: new FormControl<number | null>(null, Validators.required),
  });
  loading = toSignal(this.store.select(DashboardSelector.loading()), {initialValue: false});
  options = toSignal(this.store.select(DashboardSelector.invoiceOptions()), {initialValue: []});
  stringify: TuiStringHandler<InvoiceOption> = option => option.name;

  constructor() {
    this.actions$.pipe(
      ofActionSuccessful(InvoiceSent),
      switchMap(payload => this.alertService.open(
        `Vous venez d'envoyer une facture de ${payload.response.invoice.dailyRate * payload.response.invoice.workedDaysCount} € `,
        {status: 'success', label: 'Facture envoyée !'})
      ),
      tap(() => this.form.reset()),
      takeUntilDestroyed()
    ).subscribe()
  }

  computeDailyRate(option: InvoiceOption) {
    this.form.patchValue({dailyRate: option.lastDailyRate})
  }

  sendInvoice() {
    if (!this.form.valid) return;
    const formValue = this.form.getRawValue();
    const invoiceRequest = {
      missionId: formValue.mission?.id,
      dailyRate: formValue.dailyRate,
      month: formValue.month?.toLocalNativeDate(),
      workedDaysCount: formValue.workedDaysCount,
    } as AddInvoiceRequest

    this.store.dispatch(new SendInvoice(invoiceRequest))
  }
}
