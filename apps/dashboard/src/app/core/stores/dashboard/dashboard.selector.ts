import { createPropertySelectors, createSelector } from "@ngxs/store";
import { DashboardState, DashboardStateModel } from "./dashboard.state";

export class DashboardSelector {

  static slices = createPropertySelectors<DashboardStateModel>(DashboardState);

  static summaries() {
    return createSelector(
      [DashboardSelector.slices.missions, DashboardSelector.slices.selectedMissionId],
      (missions, selectedMissionId) => missions.map(mission => ({
        id: mission.id,
        name: mission.name,
        role: mission.role,
        selected: mission.id === selectedMissionId
      })))
  }
}
