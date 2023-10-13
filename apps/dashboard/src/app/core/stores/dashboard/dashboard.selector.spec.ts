import { DashboardSelector } from "./dashboard.selector";
import { StubMissionBuilder } from "../../models/builders/mission.builder";

describe('Dashboard Selectors', () => {

  it('should retrieve mission summaries', () => {
    const missions = [
      new StubMissionBuilder()
        .withId('id-fancy-company')
        .withName('Fancy Company')
        .withRole('Lead dev Front-end')
        .build()
    ];
    expect(DashboardSelector.summaries()(missions)).toEqual([
      {id: 'id-fancy-company', name: 'Fancy Company', role: 'Lead dev Front-end'}
    ]);
  });
});
