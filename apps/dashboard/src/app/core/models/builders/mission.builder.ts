import { Mission } from "../mission.model";

export class MissionBuilder {
  protected id: string;
  protected name: string;
  protected description: string;

  withId(id: string): MissionBuilder {
    this.id = id;
    return this;
  }

  withName(name: string): MissionBuilder {
    this.name = name;
    return this;
  }

  withDescription(description: string): MissionBuilder {
    this.description = description;
    return this;
  }

  build(): Mission {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
    };
  }
}

export class StubMissionBuilder extends MissionBuilder {
  protected override id = "mission-id";
  protected override name = "Arlan Dev";
  protected override description = "Développement Fullstack";
}
