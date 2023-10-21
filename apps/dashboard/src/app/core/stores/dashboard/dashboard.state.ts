import { inject, Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { Mission } from "../../models/mission.model";
import { MissionsRetrieved, RetrieveMissions } from "./dashboard.actions";
import { DashboardGateway } from "../../ports/dashboard.gateway";
import { tap } from "rxjs";

export interface DashboardStateModel {
  missions: Mission[];
}

@State<DashboardStateModel>({
  name: "dashboard",
  defaults: {
    missions: []
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
}
