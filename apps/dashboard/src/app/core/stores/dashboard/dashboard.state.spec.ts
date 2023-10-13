import { TestBed } from "@angular/core/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { DashboardState, DashboardStateModel } from "./dashboard.state";
import { RetrieveMissions, SelectMission } from "./dashboard.action";
import { InMemoryDashboardGateway } from "../../../adapters/in-memory-dashboard.gateway";
import { DashboardGateway } from "../../ports/dashboard.gateway";
import { StubMissionBuilder } from "../../models/builders/mission.builder";

describe('DashboardState', () => {
  let store: Store;
  let dashboardGateway: InMemoryDashboardGateway;

  beforeEach(() => {
    dashboardGateway = new InMemoryDashboardGateway();
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([DashboardState])],
      providers: [{provide: DashboardGateway, useValue: dashboardGateway}]
    });

    store = TestBed.inject(Store);
  });

  it('should have default values', () => {
    expect(store.snapshot().dashboard).toEqual({
      missions: [],
      selectedMissionId: null
    });
  })

  it('should retrieve missions', () => {
    dashboardGateway.withMissions([new StubMissionBuilder().build()]);
    store.dispatch(new RetrieveMissions());
    expect(store.snapshot().dashboard.missions).toEqual([new StubMissionBuilder().build()]);
  });

  it('should select mission', () => {
    store.dispatch(new SelectMission("mission-id"));
    expect(store.snapshot().dashboard.selectedMissionId).toEqual("mission-id");
  });

  it('should unselect mission', () => {
    initStore({selectedMissionId: "mission-id"});
    store.dispatch(new SelectMission("mission-id"));
    expect(store.snapshot().dashboard.selectedMissionId).toBeNull();
  });

  function initStore(partial: Partial<DashboardStateModel>) {
    store.reset({
      dashboard: {
        missions: [],
        selectedMissionId: null,
        ...partial
      }
    })
  }
});
