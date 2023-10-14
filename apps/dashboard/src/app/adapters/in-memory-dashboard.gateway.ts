import { DashboardGateway } from "../core/ports/dashboard.gateway";
import { BehaviorSubject, Observable, of } from "rxjs";
import { Mission } from "../core/models/mission.model";
import { AddInvoiceResponse } from "../core/models/add-invoice-response.model";
import { AddInvoiceRequest } from "../core/models/add-invoice-request.model";

export class InMemoryDashboardGateway extends DashboardGateway {
  missions$$ = new BehaviorSubject<Mission[]>([]);

  withMissions(missions: Mission[]): InMemoryDashboardGateway {
    this.missions$$.next(missions);
    return this;
  }

  override retrieveMissions(): Observable<Mission[]> {
    return this.missions$$.asObservable();
  }

  override sendInvoice(invoice: AddInvoiceRequest): Observable<AddInvoiceResponse> {
    const newInvoice = {
      id: `id-invoice-${invoice.missionId}-${new Date().getTime()}`,
      month: invoice.month,
      dailyRate: invoice.dailyRate,
      workedDaysCount: invoice.workedDaysCount
    }

    const missions = this.missions$$
      .getValue()
      .map(mission => mission.id === invoice.missionId ? {...mission, invoices: [...mission.invoices, newInvoice]} : mission);
    this.missions$$.next(missions);

    return of({
      missionId: invoice.missionId,
      invoice: newInvoice
    });
  }
}
