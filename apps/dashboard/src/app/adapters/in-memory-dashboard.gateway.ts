import { DashboardGateway } from "../core/ports/dashboard.gateway";
import { Observable, of } from "rxjs";
import { Mission } from "../core/models/mission.model";
import { AddInvoiceResponse } from "../core/models/add-invoice-response.model";
import { AddInvoiceRequest } from "../core/models/add-invoice-request.model";

export class InMemoryDashboardGateway extends DashboardGateway {
  missions = [] as Mission[];

  withMissions(missions: Mission[]): InMemoryDashboardGateway {
    this.missions = missions
    return this;
  }

  override retrieveMissions(): Observable<Mission[]> {
    return of(this.missions);
  }

  override sendInvoice(invoice: AddInvoiceRequest): Observable<AddInvoiceResponse> {
    const newInvoice = {
      id: `id-invoice-${invoice.missionId}-${new Date().getTime()}`,
      month: invoice.month,
      dailyRate: invoice.dailyRate,
      workedDaysCount: invoice.workedDaysCount
    }

    this.missions = this.missions.map(mission => mission.id === invoice.missionId ? {
      ...mission,
      invoices: [...mission.invoices, newInvoice]
    } : mission);

    return of({
      missionId: invoice.missionId,
      invoice: newInvoice
    });
  }
}
