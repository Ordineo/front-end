import {Milestone} from "../core/models/milestone";
export class UrlHelper {
  static getLastSegment(url:string):string {
    var result = url.split('/');
    return result[result.length - 1];
  }

  static getMilestoneIdFromUrl(milestone:Milestone):string {
    return UrlHelper.getLastSegment(milestone['_links']['self']['href']);
  }
}
