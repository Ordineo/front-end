import {TimeLine} from "../model/timeline.model.ts";
import {ITimeLineItem} from "../model/timeline.item.model.ts";

export class TimeLineJSONParser {

  static NAME = 'ordineo.timelineparser';

  public parse(data:any) {
    var timelineResources = data._embedded.timelineResources;
    var timelineItems:Array<ITimeLineItem> = [];

    for (var i = 0; i < timelineResources.length; i++) {
      var item:ITimeLineItem = this.parseTimeLineItem(timelineResources[i]);
      timelineItems.push(item);
    }

    return new TimeLine(timelineItems);
  }

  private parseTimeLineItem(resource:any):ITimeLineItem {
    var timeLineItem:ITimeLineItem = {
      type: resource.type,
      description: resource.description,
      moreInformation: resource.moreInformation,
      reviewer: resource.reviewer,
      tags: resource.tags,
      date: resource.date
    };

    return timeLineItem;
  }
}
