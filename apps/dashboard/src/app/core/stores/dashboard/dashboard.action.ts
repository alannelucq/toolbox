export class RetrieveMissions {
  static readonly type = '[Dashboard] Retrieve missions';
}

export class SelectMission {
  static readonly type = '[Dashboard] Select mission';

  constructor(public missionId: string) {
  }
}
