import {Objective} from "../../src/app/core/models/objective";
export class MockObjective implements Objective {
  title: string = "Mock Objective Title";
  description: string = "Mock Objective description";
  objectiveType: string = "type";
  tags: ["tag1", "tag2"];
}
