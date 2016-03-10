import IComponentOptions = angular.IComponentOptions;

export interface IAboutComponent {

}

export class AboutComponent implements IComponentOptions {
  bindings:any = {
    person: '<',
    imgUrl: '<'
  };
  controller:Function = AboutComponentController;
  controllerAs:string = '$ctrl';
  template:string = require('./about-template.html');
}

export class AboutComponentController {

}
