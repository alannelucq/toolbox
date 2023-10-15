import { Mission } from "../../models/mission.model";
import { Action, State, StateContext } from "@ngxs/store";
import { inject, Injectable } from "@angular/core";
import { InvoiceSent, MissionRetrieved, MissionSelected, RetrieveMissions, SendInvoice } from "./dashboard.action";
import { DashboardGateway } from "../../ports/dashboard.gateway";
import { tap } from "rxjs";

export interface DashboardStateModel {
  missions: Mission[];
  selectedMissionId: string | null,
  loading: boolean
}

@State<DashboardStateModel>({
  name: 'dashboard',
  defaults: {
    missions: [],
    selectedMissionId: null,
    loading: false
  }
})
@Injectable()
export class DashboardState {
  dashboardGateway = inject(DashboardGateway);

  @Action(RetrieveMissions)
  retrieveMissions(ctx: StateContext<DashboardStateModel>) {
    return this.dashboardGateway.retrieveMissions().pipe(
      tap(missions => ctx.dispatch(new MissionRetrieved(missions)))
    );
  }

  @Action(MissionRetrieved)
  missionRetrieved(ctx: StateContext<DashboardStateModel>, {missions}: MissionRetrieved) {
    ctx.patchState({missions});
  }

  @Action(MissionSelected)
  selectMission(ctx: StateContext<DashboardStateModel>, {missionId}: MissionSelected) {
    const isSameMission = ctx.getState().selectedMissionId === missionId;
    ctx.patchState({selectedMissionId: isSameMission ? null : missionId});
  }

  @Action(SendInvoice)
  sendInvoice(ctx: StateContext<DashboardStateModel>, {invoice}: SendInvoice) {
    ctx.patchState({loading: true});
    return this.dashboardGateway.sendInvoice(invoice).pipe(
      tap(response => ctx.dispatch(new InvoiceSent(response)))
    );
  }

  @Action(InvoiceSent)
  invoiceSent(ctx: StateContext<DashboardStateModel>, {response}: InvoiceSent) {
    const missions = ctx.getState().missions.map(mission => mission.id === response.missionId ? {...mission, invoices: [...mission.invoices, response.invoice]} : mission);
    ctx.patchState({missions, loading: false});
  }
}
