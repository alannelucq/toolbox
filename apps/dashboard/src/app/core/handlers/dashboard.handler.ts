import { DashboardGateway } from "../ports/dashboard.gateway";

export default class DashboardHandler {
  constructor(private source: DashboardGateway) {
  }

  retrieveMissions() {
    return this.source.retrieveMissions();
  }
}
