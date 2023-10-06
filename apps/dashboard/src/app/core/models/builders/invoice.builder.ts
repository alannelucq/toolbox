import { Invoice } from "../invoice.model";

export class InvoiceBuilder {
  protected id: string;
  protected month: Date;
  protected workDaysCount: number;
  protected dailyRate: number;

  public withId(id: string): InvoiceBuilder {
    this.id = id;
    return this;
  }

  public withMonth(month: Date): InvoiceBuilder {
    this.month = month;
    return this;
  }

  public withWorkDaysCount(workDaysCount: number): InvoiceBuilder {
    this.workDaysCount = workDaysCount;
    return this;
  }

  public withDailyRate(dailyRate: number): InvoiceBuilder {
    this.dailyRate = dailyRate;
    return this;
  }

  public build(): Invoice {
    return {
      id: this.id,
      month: this.month,
      workDaysCount: this.workDaysCount,
      dailyRate: this.dailyRate,
    };
  }
}

export class StubInvoiceBuilder extends InvoiceBuilder {
  override id = "invoice-id";
  override month = new Date();
  override workDaysCount = 20;
  override dailyRate = 500;
}
