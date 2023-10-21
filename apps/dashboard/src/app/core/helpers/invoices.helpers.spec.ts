import { on } from "@toolbox/helpers";
import { InvoiceBuilder } from "../models/builders/invoice.builder";
import { generateInvoices } from "./invoices.helpers";

describe('Invoices Helpers', () => {

  it('should generate invoices', () => {
    const invoices = generateInvoices({
      name: 'Stubby Company',
      workDaysCount: 20,
      dailyRate: 500,
      count: 2,
      begin: on('01/12/2022')
    });

    expect(invoices).toEqual([
      new InvoiceBuilder()
        .withId('invoice-Stubby Company-0')
        .withMonth(on('01/12/2022'))
        .withDailyRate(500)
        .withWorkDaysCount(20)
        .build(),
      new InvoiceBuilder()
        .withId('invoice-Stubby Company-1')
        .withMonth(on('01/01/2023'))
        .withDailyRate(500)
        .withWorkDaysCount(20)
        .build(),
    ]);
  });
})
