import { TestBed } from "@angular/core/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { DashboardState, DashboardStateModel } from "./dashboard.state";
import { RetrieveMissions, SelectMission, SendInvoice } from "./dashboard.action";
import { InMemoryDashboardGateway } from "../../../adapters/in-memory-dashboard.gateway";
import { DashboardGateway } from "../../ports/dashboard.gateway";
import { StubMissionBuilder } from "../../models/builders/mission.builder";
import { on } from "@toolbox/helpers";
import { StubInvoiceBuilder } from "../../models/builders/invoice.builder";
import { Mission } from "../../models/mission.model";

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

  it('should send invoice', () => {
    initStore({
      missions: [
        new StubMissionBuilder()
          .withId("mission-id")
          .withInvoices([new StubInvoiceBuilder().withMonth(on("01/09/2023")).build()])
          .build()
      ]
    });

    store.dispatch(new SendInvoice({missionId: "mission-id", month: on("01/10/2023"), dailyRate: 600, workedDaysCount: 10}));

    const invoices = store.snapshot().dashboard.missions.flatMap((mission: Mission) => mission.invoices);

    expect(invoices.length).toBe(2);
    expect(invoices[1].month).toEqual(on("01/10/2023"));
    expect(invoices[1].dailyRate).toEqual(600);
    expect(invoices[1].workedDaysCount).toEqual(10);
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
