import { Mission } from "../../models/mission.model";
import { Action, State, StateContext } from "@ngxs/store";
import { inject, Injectable } from "@angular/core";
import { RetrieveMissions, SelectMission } from "./dashboard.action";
import { DashboardGateway } from "../../ports/dashboard.gateway";
import { tap } from "rxjs";

export interface DashboardStateModel {
  missions: Mission[];
  selectedMissionId: string | null
}

@State<DashboardStateModel>({
  name: 'dashboard',
  defaults: {
    missions: [],
    selectedMissionId: null
  }
})
@Injectable()
export class DashboardState {
  dashboardGateway = inject(DashboardGateway);

  @Action(RetrieveMissions)
  retrieveMissions(ctx: StateContext<DashboardStateModel>) {
    return this.dashboardGateway.retrieveMissions().pipe(
      tap(missions => ctx.patchState({missions}))
    );
  }

  @Action(SelectMission)
  selectMission(ctx: StateContext<DashboardStateModel>, {missionId}: SelectMission) {
    const isSameMission = ctx.getState().selectedMissionId === missionId;
    ctx.patchState({selectedMissionId: isSameMission ? null : missionId});
  }
}
