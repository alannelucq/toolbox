import { Contact } from "../contact.model";

export class ContactBuilder {
  protected id: string;
  protected firstName: string;
  protected lastName: string;
  protected email: string;
  protected phone: string;

  public withId(id: string): ContactBuilder {
    this.id = id;
    return this;
  }

  public withName(name: string): ContactBuilder {
    const [firstName, lastName] = name.split(' ');
    this.firstName = firstName;
    this.lastName = lastName;
    return this;
  }

  public withEmail(email: string): ContactBuilder {
    this.email = email;
    return this;
  }

  public withPhone(phone: string): ContactBuilder {
    this.phone = phone;
    return this;
  }

  public build(): Contact {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
    };
  }
}

export class StubContactBuilder extends ContactBuilder {
  override id = "contact-id";
  override firstName = "John";
  override lastName = "Doe";
  override email = "john.doe@mail.com";
  override phone = "0601020310";
}
