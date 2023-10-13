export interface MissionDetail {
  name: string;
  description: string;
  skills: string[];
  lastInvoice: {
    month: Date;
    dailyRate: number;
  };
  contact: {
    name: string;
    email: string;
  }
}
