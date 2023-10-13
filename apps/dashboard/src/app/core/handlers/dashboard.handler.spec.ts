import DashboardHandler from "./dashboard.handler";
import { InMemoryDashboardGateway } from "../../adapters/in-memory-dashboard.gateway";
import { StubMissionBuilder } from "../models/builders/mission.builder";
import { firstValueFrom } from "rxjs";

describe('Dashboard Handler', () => {

  it('should retrieve missions', async () => {
    const source = new InMemoryDashboardGateway().withMissions([new StubMissionBuilder().build()]);
    const handler = new DashboardHandler(source);
    await expect(firstValueFrom(handler.retrieveMissions())).resolves.toEqual([new StubMissionBuilder().build()]);
  });
});
