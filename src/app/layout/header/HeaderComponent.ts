import IComponentOptions = angular.IComponentOptions;
export class HeaderComponent implements IComponentOptions{

  template:string = require('./header-template.html');
  controller:string = HeaderComponentController;
}
export class HeaderComponentController{

}
