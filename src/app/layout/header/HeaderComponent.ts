import IComponentOptions = angular.IComponentOptions;
import './header-styles.scss';

export class HeaderComponent implements IComponentOptions {
  static NAME:string = "appHeader";

  bindings:any = {
    title: '@'
  };
  template:string = `
    <div layout="row" layout-align="start center">
      <span flex="5"></span>
      <span ng-if="$ctrl.title" class="bg-title-header md-display-1">{{$ctrl.title}}</span>
      <span flex="5"></span>
    </div>
  `;

}
export class HeaderComponentController {

}
