import { Mission } from "../../models/mission.model";
import { State } from "@ngxs/store";
import { Injectable } from "@angular/core";

export interface DashboardStateModel {
  missions: Mission[];
}

@State<DashboardStateModel>({
  name: 'dashboard',
  defaults: {
    missions: []
  }
})
@Injectable()
export class DashboardState {

}
