import { StubMissionBuilder } from "../../models/builders/mission.builder";
import { DashboardSelectors } from "./dashboard.selectors";

describe('Dashboard Selectors', () => {

  it('should retrieve mission summary', () => {
    const missions = [
      new StubMissionBuilder()
        .withId("mission-id")
        .withName("Fancy Company")
        .withRole("Lead dev")
        .build()
    ];
    const selectedMissionId = "mission-id";

    expect(DashboardSelectors.summaries()(missions, selectedMissionId)).toEqual([
      {id: "mission-id", name: "Fancy Company", role: "Lead dev", selected: true}
    ]);
  });
});
