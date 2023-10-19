import { DashboardGateway } from "../ports/dashboard.gateway";
import { BehaviorSubject, Observable } from "rxjs";
import { Mission } from "../models/mission.model";

export class InMemoryDashboardGateway extends DashboardGateway {
  missions$$ = new BehaviorSubject<Mission[]>([]);

  withMissions(missions: Mission[]): InMemoryDashboardGateway {
    this.missions$$.next(missions);
    return this;
  }

  override retrieveMissions(): Observable<Mission[]> {
    return this.missions$$.asObservable();
  }
}
