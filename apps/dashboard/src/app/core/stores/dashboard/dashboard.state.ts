import { inject, Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { Mission } from "../../models/mission.model";
import { InvoiceSent, MissionSelected, MissionsRetrieved, RetrieveMissions, SendInvoice } from "./dashboard.actions";
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

  @Action(SendInvoice)
  sendInvoice(ctx: StateContext<DashboardStateModel>, {invoice}: SendInvoice) {
    return this.dashboardGateway.sendInvoice(invoice).pipe(
      tap(response => ctx.dispatch(new InvoiceSent(response)))
    );
  }

  @Action(InvoiceSent)
  invoiceSent(ctx: StateContext<DashboardStateModel>, {response}: InvoiceSent) {
    const missions = ctx.getState().missions
      .map(mission => mission.id === response.missionId ? {...mission, invoices: [...mission.invoices, response.invoice]} : mission);
    ctx.patchState({missions});
  }
}
