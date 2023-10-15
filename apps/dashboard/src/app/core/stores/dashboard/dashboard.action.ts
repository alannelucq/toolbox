import { AddInvoiceRequest } from "../../models/add-invoice-request.model";
import { AddInvoiceResponse } from "../../models/add-invoice-response.model";
import { Mission } from "../../models/mission.model";

export class RetrieveMissions {
  static readonly type = '[Dashboard Page] Retrieve missions';
}

export class MissionRetrieved {
  static readonly type = '[Dashboard API] Mission retrieved';

  constructor(public missions: Mission[]) {
  }
}

export class MissionSelected {
  static readonly type = '[Dashboard Page] Mission selected';

  constructor(public missionId: string) {
  }
}

export class SendInvoice {
  static readonly type = '[Dashboard Page] Send invoice';

  constructor(public invoice: AddInvoiceRequest) {
  }
}

export class InvoiceSent {
  static readonly type = '[Dashboard API] Invoice sent';

  constructor(public response: AddInvoiceResponse) {
  }
}
