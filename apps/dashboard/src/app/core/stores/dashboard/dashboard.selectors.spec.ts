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

    expect(DashboardSelectors.summaries()(missions)).toEqual([
      {id: "mission-id", title: "Fancy Company", role: "Lead dev"}
    ]);
  });
});
