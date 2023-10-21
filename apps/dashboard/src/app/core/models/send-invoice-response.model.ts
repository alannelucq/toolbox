import { Invoice } from "./invoice.model";

export interface SendInvoiceResponse {
  missionId: string;
  invoice: Invoice;
}
