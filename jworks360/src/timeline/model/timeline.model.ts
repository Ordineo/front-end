
import {TimeLineObjective} from "./timeline.objective.model";

export class TimeLine{

  constructor(private objectives:Array<TimeLineObjective>){

  }

  getObjectives():Array<TimeLineObjective>{
    return this.objectives;
  }
}
