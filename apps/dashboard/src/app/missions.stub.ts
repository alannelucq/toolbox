import { MissionBuilder } from "./core/models/builders/mission.builder";
import { ContactBuilder } from "./core/models/builders/contact.builder";
import { on } from "@toolbox/helpers";
import { generateInvoices } from "./core/helpers/invoices.helpers";

const MISSION_COMPANY_A = new MissionBuilder()
  .withId('mission-company-a-id')
  .withName('Stubby Company')
  .withRole('Lead Dev Front-end')
  .withDescription('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.')
  .withContact(
    new ContactBuilder()
      .withId('contact-company-a-id')
      .withName('John Doe')
      .withEmail('john.doe@mail.com')
      .withPhone('06 12 34 56 78')
      .build()
  )
  .withSkills(['Angular', 'RxJS', 'TypeScript'])
  .withInvoices(generateInvoices({
    name: 'Stubby Company',
    workDaysCount: 20,
    dailyRate: 500,
    count: 3,
    begin: on('01/01/2023')
  }))
  .build();

const MISSION_COMPANY_B = new MissionBuilder()
  .withId('mission-company-b-id')
  .withName('Fancy Company')
  .withRole('Dev Front-end')
  .withDescription('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.')
  .withContact(
    new ContactBuilder()
      .withId('contact-company-b-id')
      .withName('Jane Doe')
      .withEmail('jane.doe@mail.com')
      .withPhone('06 12 34 56 78')
      .build()
  )
  .withSkills(['Angular', 'TypeScript', 'NGXS'])
  .withInvoices(generateInvoices({
    name: 'Fancy Company',
    workDaysCount: 20,
    dailyRate: 550,
    count: 4,
    begin: on('01/04/2023')
  }))
  .build();

const MISSION_COMPANY_C = new MissionBuilder()
  .withId('big-bank-company-id')
  .withName('Big Bank Company')
  .withRole('Lead Dev Front-end')
  .withDescription('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.')
  .withContact(
    new ContactBuilder()
      .withId('contact-company-c-id')
      .withName('Dummy John')
      .withEmail('dummy.john@mail.com')
      .withPhone('06 12 34 56 78')
      .build()
  )
  .withSkills(['Angular', 'RxJS', 'Jest'])
  .withInvoices(generateInvoices({
    name: 'Big Bank Company',
    workDaysCount: 20,
    dailyRate: 800,
    count: 3,
    begin: on('01/08/2023')
  }))
  .build();

export const MISSIONS = [MISSION_COMPANY_A, MISSION_COMPANY_B, MISSION_COMPANY_C];
