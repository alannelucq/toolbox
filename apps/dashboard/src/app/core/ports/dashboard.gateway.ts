import { Observable } from "rxjs";
import { Mission } from "../models/mission.model";
import { SendInvoiceRequest } from "../models/send-invoice-request.model";
import { SendInvoiceResponse } from "../models/send-invoice-response.model";

export abstract class DashboardGateway {
  abstract retrieveMissions(): Observable<Mission[]>;

  abstract sendInvoice(invoice: SendInvoiceRequest): Observable<SendInvoiceResponse>;
}
