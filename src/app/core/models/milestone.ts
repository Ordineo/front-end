import {Objective} from "./objective";
export interface Milestone {
  objective:Objective;
  title?:string;
  createDate:Date;
  dueDate:Date;
  endDate?:Date;
  moreInformation:string;
}
