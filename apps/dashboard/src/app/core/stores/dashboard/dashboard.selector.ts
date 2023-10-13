import { createPropertySelectors, createSelector } from "@ngxs/store";
import { DashboardState, DashboardStateModel } from "./dashboard.state";

export class DashboardSelector {

  static slices = createPropertySelectors<DashboardStateModel>(DashboardState);

  static summaries() {
    return createSelector(
      [DashboardSelector.slices.missions],
      missions => missions.map(mission => ({
        id: mission.id,
        name: mission.name,
        role: mission.role
      })))
  }
}
