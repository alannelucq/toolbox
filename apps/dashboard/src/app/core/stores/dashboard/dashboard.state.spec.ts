import { TestBed } from "@angular/core/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { DashboardState } from "./dashboard.state";
import { RetrieveMissions } from "./dashboard.action";
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
    expect(store.snapshot().dashboard).toEqual({missions: []});
  })

  it('should retrieve missions', () => {
    dashboardGateway.withMissions([new StubMissionBuilder().build()]);
    store.dispatch(new RetrieveMissions());
    expect(store.snapshot().dashboard).toEqual({missions: [new StubMissionBuilder().build()]});
  });
});
