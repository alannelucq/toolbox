import { Mission } from "../../models/mission.model";
import { SendInvoiceRequest } from "../../models/send-invoice-request.model";
import { SendInvoiceResponse } from "../../models/send-invoice-response.model";

export class RetrieveMissions {
  static readonly type = "[Dashboard Page] Retrieve missions";
}

export class MissionsRetrieved {
  static readonly type = "[Dashboard API] Missions retrieved";

  constructor(public missions: Mission[]) {
  }
}

export class MissionSelected {
  static readonly type = "[Dashboard Page] Mission selected";

  constructor(public missionId: string) {
  }
}

export class SendInvoice {
  static readonly type = "[Dashboard Page] Send invoice";

  constructor(public invoice: SendInvoiceRequest) {
  }
}

export class InvoiceSent {
  static readonly type = "[Dashboard API] Invoice sent";

  constructor(public response: SendInvoiceResponse) {
  }
}
