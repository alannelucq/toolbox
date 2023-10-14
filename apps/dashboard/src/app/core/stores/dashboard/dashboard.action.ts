import { AddInvoiceRequest } from "../../models/add-invoice-request.model";
import { AddInvoiceResponse } from "../../models/add-invoice-response.model";
import { Mission } from "../../models/mission.model";

export class RetrieveMissions {
  static readonly type = '[Dashboard] Retrieve missions';
}

export class MissionRetrieved {
  static readonly type = '[Dashboard API] Mission retrieved';

  constructor(public missions: Mission[]) {
  }
}

export class SelectMission {
  static readonly type = '[Dashboard] Select mission';

  constructor(public missionId: string) {
  }
}

export class SendInvoice {
  static readonly type = '[Dashboard] Send invoice';

  constructor(public invoice: AddInvoiceRequest) {
  }
}

export class InvoiceSent {
  static readonly type = '[Dashboard API] Invoice sent';

  constructor(public response: AddInvoiceResponse) {
  }
}
