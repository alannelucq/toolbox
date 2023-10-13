import { Observable } from "rxjs";
import { Mission } from "../models/mission.model";

export abstract class DashboardGateway {
  abstract retrieveMissions(): Observable<Mission[]>;
}
