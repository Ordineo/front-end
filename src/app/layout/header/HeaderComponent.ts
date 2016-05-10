import IComponentOptions = angular.IComponentOptions;
import './header-styles.scss';

export class HeaderComponent implements IComponentOptions {
  static NAME:string = "appHeader";

  bindings:any = {
    title: '@'
  };
  template:string = `
    <div>
      <span class="md-display-1">{{$ctrl.title}}</span>    
    </div>
  `;

}
export class HeaderComponentController {

}
