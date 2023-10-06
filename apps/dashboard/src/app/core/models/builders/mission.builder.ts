import { Mission } from "../mission.model";
import { Contact } from "../contact.model";
import { StubContactBuilder } from "./contact.builder";
import { Invoice } from "../invoice.model";
import { StubInvoiceBuilder } from "./invoice.builder";

export class MissionBuilder {
  protected id: string;
  protected name: string;
  protected role: string;
  protected description: string;
  protected contact: Contact;
  protected invoices: Invoice[];
  protected skills: string[];

  withId(id: string): MissionBuilder {
    this.id = id;
    return this;
  }

  withName(name: string): MissionBuilder {
    this.name = name;
    return this;
  }

  withRole(role: string): MissionBuilder {
    this.role = role;
    return this;
  }

  withDescription(description: string): MissionBuilder {
    this.description = description;
    return this;
  }

  withContact(contact: Contact): MissionBuilder {
    this.contact = contact;
    return this;
  }

  withInvoices(invoices: Invoice[]): MissionBuilder {
    this.invoices = invoices;
    return this;
  }

  withSkills(skills: string[]): MissionBuilder {
    this.skills = skills;
    return this;
  }

  build(): Mission {
    return {
      id: this.id,
      name: this.name,
      role: this.role,
      description: this.description,
      contact: this.contact,
      invoices: this.invoices,
      skills: this.skills,
    };
  }
}

export class StubMissionBuilder extends MissionBuilder {
  protected override id = "mission-id";
  protected override name = "Stubby Company";
  protected override role = "Lead Dev Front-end";
  protected override description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
  protected override contact = new StubContactBuilder().build();
  protected override invoices = [new StubInvoiceBuilder().build()];
  protected override skills = ["Angular", "TypeScript", "RxJS", "HTML", "CSS"];
}
