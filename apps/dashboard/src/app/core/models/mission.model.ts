import { Contact } from "./contact.model";
import { Invoice } from "./invoice.model";

export interface Mission {
  id: string;
  name: string;
  role: string;
  description: string;
  contact: Contact;
  invoices: Invoice[];
  skills: string[];
}
