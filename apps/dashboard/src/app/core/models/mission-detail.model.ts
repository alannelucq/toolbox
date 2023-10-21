import { ContactSummary } from "./contact-summary.model";

export interface MissionDetail {
  name: string;
  description: string;
  skills: string[];
  lastInvoice: {
    month: Date;
    dailyRate: number;
  };
  contact: ContactSummary
}
