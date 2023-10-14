import { Invoice } from "./invoice.model";

export interface AddInvoiceResponse {
  missionId: string;
  invoice: Invoice;
}
