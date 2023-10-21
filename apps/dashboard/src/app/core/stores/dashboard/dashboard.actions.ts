import { Mission } from "../../models/mission.model";

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
