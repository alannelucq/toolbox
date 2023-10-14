import { Observable } from "rxjs";
import { Mission } from "../models/mission.model";
import { AddInvoiceResponse } from "../models/add-invoice-response.model";
import { AddInvoiceRequest } from "../models/add-invoice-request.model";

export abstract class DashboardGateway {
  abstract retrieveMissions(): Observable<Mission[]>;

  abstract sendInvoice(invoice: AddInvoiceRequest): Observable<AddInvoiceResponse>;
}
