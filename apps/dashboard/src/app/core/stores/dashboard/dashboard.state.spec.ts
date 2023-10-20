import { NgxsModule, Store } from "@ngxs/store";
import { TestBed } from "@angular/core/testing";
import { DashboardState } from "./dashboard.state";

describe('DashboardState', () => {
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([DashboardState])]
    });

    store = TestBed.inject(Store);
  });

  it('should have default values', () => {
    expect(store.snapshot().dashboard).toEqual({
      missions: []
    })
  });
});
