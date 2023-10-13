import { DashboardSelector } from "./dashboard.selector";
import { MissionBuilder, StubMissionBuilder } from "../../models/builders/mission.builder";
import { StubContactBuilder } from "../../models/builders/contact.builder";
import { InvoiceBuilder } from "../../models/builders/invoice.builder";
import { on } from "@toolbox/helpers";

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
});
