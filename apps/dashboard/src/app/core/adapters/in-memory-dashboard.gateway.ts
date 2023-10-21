import { DashboardGateway } from "../ports/dashboard.gateway";
import { Observable, of } from "rxjs";
import { Mission } from "../models/mission.model";
import { SendInvoiceRequest } from "../models/send-invoice-request.model";
import { SendInvoiceResponse } from "../models/send-invoice-response.model";
import { InvoiceBuilder } from "../models/builders/invoice.builder";

export class InMemoryDashboardGateway extends DashboardGateway {
  missions: Mission[] = [];

  withMissions(missions: Mission[]): InMemoryDashboardGateway {
    this.missions = missions;
    return this;
  }

  override retrieveMissions(): Observable<Mission[]> {
    return of(this.missions);
  }

  override sendInvoice(invoice: SendInvoiceRequest): Observable<SendInvoiceResponse> {
    const newInvoice = new InvoiceBuilder()
      .withId(`id-invoice-${invoice.missionId}-${new Date().getTime()}`)
      .withMonth(invoice.month)
      .withDailyRate(invoice.dailyRate)
      .withWorkDaysCount(invoice.workedDaysCount)
      .build();

    this.missions = this.missions
      .map(mission => mission.id === invoice.missionId ? {...mission, invoices: [...mission.invoices, newInvoice]} : mission);

    return of({
      missionId: invoice.missionId,
      invoice: newInvoice
    });
  }
}
