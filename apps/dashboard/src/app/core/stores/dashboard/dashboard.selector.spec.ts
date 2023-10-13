import { DashboardSelector } from "./dashboard.selector";
import { StubMissionBuilder } from "../../models/builders/mission.builder";

describe('Dashboard Selectors', () => {

  it('should retrieve mission summaries', () => {
    const missions = [
      new StubMissionBuilder()
        .withId('id-fancy-company')
        .withName('Fancy Company')
        .withRole('Lead dev Front-end')
        .build(),
      new StubMissionBuilder()
        .withId('id-uber')
        .withName('Uber')
        .withRole('Lead dev Front-end')
        .build()
    ];
    const selectedMissionId = 'id-fancy-company';
    expect(DashboardSelector.summaries()(missions, selectedMissionId)).toEqual([
      {id: 'id-fancy-company', name: 'Fancy Company', role: 'Lead dev Front-end', selected: true},
      {id: 'id-uber', name: 'Uber', role: 'Lead dev Front-end', selected: false},
    ]);
  });
});
