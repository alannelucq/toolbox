import { DashboardSelector } from "./dashboard.selector";
import { MissionBuilder, StubMissionBuilder } from "../../models/builders/mission.builder";
import { StubContactBuilder } from "../../models/builders/contact.builder";
import { InvoiceBuilder } from "../../models/builders/invoice.builder";
import { on } from "@toolbox/helpers";
import { generateInvoices } from "../../helpers/generate-invoices.helper";

describe('Dashboard Selectors', () => {

  it('should retrieve mission summaries', () => {
    const missions = [
      new StubMissionBuilder()
        .withId('id-fancy-company')
        .withName('Fancy Company')
        .withRole('Lead dev Front-end')
        .build(),
      new StubMissionBuilder()
        .withId('id-uber')
        .withName('Uber')
        .withRole('Lead dev Front-end')
        .build()
    ];
    const selectedMissionId = 'id-fancy-company';
    expect(DashboardSelector.summaries()(missions, selectedMissionId)).toEqual([
      {id: 'id-fancy-company', name: 'Fancy Company', role: 'Lead dev Front-end', selected: true},
      {id: 'id-uber', name: 'Uber', role: 'Lead dev Front-end', selected: false},
    ]);
  });

  it('should retrieve selected mission detail', () => {
    const missions = [
      new MissionBuilder()
        .withId('id-fancy-company')
        .withDescription('Une super mission')
        .withName('Fancy Company')
        .withRole('Lead dev Front-end')
        .withSkills(['Angular', 'TypeScript', 'RxJS'])
        .withContact(
          new StubContactBuilder()
            .withName('John Doe')
            .withEmail('john.doe@mail.com')
            .withPhone('06 10 20 30 40')
            .build()
        )
        .withInvoices([
          new InvoiceBuilder()
            .withId('invoice-1')
            .withDailyRate(400)
            .withMonth(on("01/09/2020"))
            .withWorkDaysCount(20)
            .build(),
          new InvoiceBuilder()
            .withId('invoice-2')
            .withDailyRate(500)
            .withMonth(on("01/10/2020"))
            .withWorkDaysCount(10)
            .build()
        ])
        .build()
    ];
    const selectedMissionId = 'id-fancy-company';

    expect(DashboardSelector.selectedMissionDetail()(missions, selectedMissionId)).toEqual({
      name: 'Fancy Company',
      description: 'Une super mission',
      skills: ['Angular', 'TypeScript', 'RxJS'],
      lastInvoice: {
        month: on("01/10/2020"),
        dailyRate: 500
      },
      contact: {
        name: 'John Doe',
        email: 'john.doe@mail.com',
      },
    });
  });

  it('should not have selected detail', () => {
    const missions = [new StubMissionBuilder().build()];
    const selectedMissionId = null;

    expect(DashboardSelector.selectedMissionDetail()(missions, selectedMissionId)).toBeNull();
  });

  it('should aggregate metrics', () => {
    withToday(on('01/06/2023'));
    const missions = [
      new StubMissionBuilder()
        .withId('id-stubby-company')
        .withInvoices(generateInvoices({name: 'Stubby Company', workDaysCount: 20, dailyRate: 500, count: 3, begin: on('01/12/2022')}))
        .build(),
      new StubMissionBuilder()
        .withId('id-fancy-company')
        .withInvoices(generateInvoices({name: 'Fancy Company', workDaysCount: 20, dailyRate: 500, count: 2, begin: on('01/03/2023')}))
        .build()
    ];
    const selectedMissionId = null;
    expect(DashboardSelector.metrics()(missions, selectedMissionId)).toEqual({
      totalWorkedDaysCount: 80,
      totalRevenues: 40_000,
      revenues: [10_000, 10_000, 10_000, 10_000, 0, 0, 0, 0, 0, 0, 0, 0]
    });
  });

  it('should retrieve metrics from selected mission', () => {
    withToday(on('01/06/2023'));
    const missions = [
      new StubMissionBuilder()
        .withId('id-stubby-company')
        .withInvoices(generateInvoices({name: 'Stubby Company', workDaysCount: 20, dailyRate: 500, count: 1, begin: on('01/01/2023')}))
        .build(),
      new StubMissionBuilder()
        .withId('id-fancy-company')
        .withInvoices(generateInvoices({name: 'Fancy Company', workDaysCount: 20, dailyRate: 500, count: 1, begin: on('01/02/2023')}))
        .build()
    ];
    const selectedMissionId = 'id-stubby-company';
    expect(DashboardSelector.metrics()(missions, selectedMissionId)).toEqual({
      totalWorkedDaysCount: 20,
      totalRevenues: 10_000,
      revenues: [10_000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    });
  });

  it('should retrieve invoice options', () => {
    const missions = [
      new StubMissionBuilder()
        .withId('id-stubby-company')
        .withName('Stubby Company')
        .withInvoices(generateInvoices({name: 'Stubby Company', workDaysCount: 20, dailyRate: 500, count: 1, begin: on('01/01/2023')}))
        .build(),
      new StubMissionBuilder()
        .withId('id-fancy-company')
        .withName('Fancy Company')
        .withInvoices(generateInvoices({name: 'Fancy Company', workDaysCount: 20, dailyRate: 600, count: 1, begin: on('01/02/2023')}))
        .build()
    ]

    expect(DashboardSelector.invoiceOptions()(missions)).toEqual([
      {id: 'id-stubby-company', name: 'Stubby Company', lastDailyRate: 500},
      {id: 'id-fancy-company', name: 'Fancy Company', lastDailyRate: 600},
    ]);
  });
});

export function withToday(date: Date) {
  jest.useFakeTimers().setSystemTime(date);
}
