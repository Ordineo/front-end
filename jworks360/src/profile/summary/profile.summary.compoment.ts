import IComponentOptions = angular.IComponentOptions;

export interface IProfileSummary {
  name:string,
  unit:string,
  xFollowers?:number,
  xFollowing?:number,
  xPosts?:number,
  xCertificates?:number,
  xPoints?:number
}

export class ProfileSummaryComponent implements IComponentOptions {
  static NAME = "profileSummary";

  controller:Function = ProfileSummaryController;
  controllerAs:string = '$ctrl';
  template:string = require('./profile.summary.html');
  bindings:any = {
    summary: '@'
  }
}

class ProfileSummaryController {
  summary:IProfileSummary;

  constructor() {
    this.summary = {
      name: 'Ryan De Gruyter',
      unit: 'DG-OPS-MS'
    }
  }
}
