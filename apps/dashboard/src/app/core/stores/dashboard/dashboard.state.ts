import { Mission } from "../../models/mission.model";
import { Action, State, StateContext } from "@ngxs/store";
import { inject, Injectable } from "@angular/core";
import { RetrieveMissions } from "./dashboard.action";
import { DashboardGateway } from "../../ports/dashboard.gateway";
import { tap } from "rxjs";

export interface DashboardStateModel {
  missions: Mission[];
}

@State<DashboardStateModel>({
  name: 'dashboard',
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
      tap(missions => ctx.patchState({missions}))
    );
  }
}
