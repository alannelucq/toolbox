import { DashboardGateway } from "../ports/dashboard.gateway";
import { Observable, of } from "rxjs";
import { Mission } from "../models/mission.model";

export class InMemoryDashboardGateway extends DashboardGateway {
  missions: Mission[] = [];

  withMissions(missions: Mission[]): InMemoryDashboardGateway {
    this.missions = missions;
    return this;
  }

  override retrieveMissions(): Observable<Mission[]> {
    return of(this.missions);
  }
}
