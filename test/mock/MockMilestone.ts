import {Milestone} from "../../src/app/core/models/milestone";
import {Objective} from "../../src/app/core/models/objective";
import {MockObjective} from "./MockObjective";
export class MockMilestone implements Milestone {
  objective: Objective = new MockObjective();
  title: string = "Milestone title";
  createDate: Date = new Date();
  dueDate: Date = new Date();
  endDate: Date = new Date();
  moreInformation: string = "more information";
}
