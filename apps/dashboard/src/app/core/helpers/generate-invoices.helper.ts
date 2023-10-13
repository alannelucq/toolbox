import { InvoiceBuilder } from "../models/builders/invoice.builder";
import { addMonths } from "@toolbox/helpers";

export function generateInvoices(options: { name: string, dailyRate: number, workDaysCount: number, count: number, begin: Date }) {
  const {name, dailyRate, count, begin, workDaysCount} = options;
  return Array.from({length: count}, (_, i) => {
    const month = addMonths(begin, i);
    return new InvoiceBuilder()
      .withId(`invoice-${name}-${i}`)
      .withMonth(month)
      .withDailyRate(dailyRate)
      .withWorkDaysCount(workDaysCount)
      .build();
  });
}
