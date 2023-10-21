import { inject, Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { Mission } from "../../models/mission.model";
import { MissionSelected, MissionsRetrieved, RetrieveMissions } from "./dashboard.actions";
import { DashboardGateway } from "../../ports/dashboard.gateway";
import { tap } from "rxjs";

export interface DashboardStateModel {
  missions: Mission[];
  selectedMissionId: string | null;
}

@State<DashboardStateModel>({
  name: "dashboard",
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
      tap(missions => ctx.dispatch(new MissionsRetrieved(missions)))
    );
  }

  @Action(MissionsRetrieved)
  missionsRetrieved(ctx: StateContext<DashboardStateModel>, {missions}: MissionsRetrieved) {
    ctx.patchState({missions});
  }

  @Action(MissionSelected)
  missionSelected(ctx: StateContext<DashboardStateModel>, {missionId}: MissionSelected) {
    const isAlreadySelected = ctx.getState().selectedMissionId === missionId;
    ctx.patchState({selectedMissionId: isAlreadySelected ? null : missionId});
  }
}
