export interface SendInvoiceRequest {
  missionId: string;
  month: Date;
  workedDaysCount: number;
  dailyRate: number;
}
