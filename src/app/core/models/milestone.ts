import {Objective} from "./objective";
export interface Milestone {
  objective:Objective;
  createDate:Date;
  dueDate:Date;
  endDate?:Date;
  moreInformation:string;
}
