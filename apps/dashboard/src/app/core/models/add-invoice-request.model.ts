export interface AddInvoiceRequest {
  missionId: string;
  month: Date;
  workedDaysCount: number;
  dailyRate: number;
}
