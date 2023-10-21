import { MissionBuilder, StubMissionBuilder } from "../../models/builders/mission.builder";
import { DashboardSelectors } from "./dashboard.selectors";
import { StubContactBuilder } from "../../models/builders/contact.builder";
import { InvoiceBuilder } from "../../models/builders/invoice.builder";
import { on } from "@toolbox/helpers";
import { generateInvoices } from "../../helpers/invoices.helpers";

describe('Dashboard Selectors', () => {

  it('should retrieve mission summary', () => {
    const missions = [
      new StubMissionBuilder()
        .withId("mission-id")
        .withName("Fancy Company")
        .withRole("Lead dev")
        .build()
    ];
    const selectedMissionId = "mission-id";

    expect(DashboardSelectors.summaries()(missions, selectedMissionId)).toEqual([
      {id: "mission-id", name: "Fancy Company", role: "Lead dev", selected: true}
    ]);
  });

  it('should not have selected detail', () => {
    const missions = [new StubMissionBuilder().build()];
    const selectedMissionId = null;
    expect(DashboardSelectors.selectedMissionDetail()(missions, selectedMissionId)).toBe(null);
  });

  it('should have selected detail', () => {
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
    expect(DashboardSelectors.selectedMissionDetail()(missions, selectedMissionId)).toEqual({
      name: 'Fancy Company',
      description: 'Une super mission',
      skills: ['Angular', 'TypeScript', 'RxJS'],
      lastInvoice: {
        dailyRate: 500,
        month: on("01/10/2020")
      },
      contact: {
        name: 'John Doe',
        email: 'john.doe@mail.com',
        phone: '06 10 20 30 40'
      }
    });
  });

  it('should aggregate metrics', () => {
    withToday(on("21/10/2023"));

    const missions = [
      new StubMissionBuilder()
        .withId('id-fancy-company')
        .withName('Fancy Company')
        .withInvoices(
          generateInvoices({
            name: 'Fancy Company',
            workDaysCount: 20,
            dailyRate: 500,
            count: 3,
            begin: on('01/12/2022')
          })
        )
        .build(),
      new StubMissionBuilder()
        .withId('id-super-company')
        .withName('Super Company')
        .withInvoices(
          generateInvoices({
            name: 'Super Company',
            workDaysCount: 20,
            dailyRate: 500,
            count: 1,
            begin: on('01/03/2023')
          })
        )
        .build()
    ];

    const selectedMissionId = null;
    expect(DashboardSelectors.metrics()(missions, selectedMissionId)).toEqual({
      totalWorkedDays: 60,
      totalRevenues: 30_000,
      revenues: [10_000, 10_000, 10_000, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    });
  });

  it('should retrieve metrics from selected mission only', () => {
    withToday(on("21/10/2023"));

    const missions = [
      new StubMissionBuilder()
        .withId('id-fancy-company')
        .withName('Fancy Company')
        .withInvoices(
          generateInvoices({
            name: 'Fancy Company',
            workDaysCount: 20,
            dailyRate: 500,
            count: 3,
            begin: on('01/12/2022')
          })
        )
        .build(),
      new StubMissionBuilder()
        .withId('id-super-company')
        .withName('Super Company')
        .withInvoices(
          generateInvoices({
            name: 'Super Company',
            workDaysCount: 20,
            dailyRate: 500,
            count: 1,
            begin: on('01/03/2023')
          })
        )
        .build()
    ];

    const selectedMissionId = 'id-fancy-company';
    expect(DashboardSelectors.metrics()(missions, selectedMissionId)).toEqual({
      totalWorkedDays: 40,
      totalRevenues: 20_000,
      revenues: [10_000, 10_000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    });
  });
});

function withToday(date: Date) {
  jest.useFakeTimers().setSystemTime(date);
}
