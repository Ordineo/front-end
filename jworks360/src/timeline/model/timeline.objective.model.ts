export interface ITimeLineObjective{
  description:string;
  moreInformation:string;
  reviewer:string;
  tags:Array<string>;
  date:string;
}

export class TimeLineObjective implements ITimeLineObjective{
  public description:string;
  public moreInformation:string;
  public reviewer:string;
  public tags:Array<string>;
  public date:string;
}
