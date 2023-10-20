import { Injectable } from "@angular/core";
import { State } from "@ngxs/store";
import { Mission } from "../../models/mission.model";

export interface DashboardStateModel {
  missions: Mission[];
}

@State<DashboardStateModel>({
  name: "dashboard",
  defaults: {
    missions: []
  }
})
@Injectable()
export class DashboardState {

}
