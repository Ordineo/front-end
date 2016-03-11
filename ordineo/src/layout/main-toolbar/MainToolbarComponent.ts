import IComponentOptions = angular.IComponentOptions;
import {MainToolbarCtrl} from "./MainToolbarCtrl";
require('./main-toolbar-styles.scss');

export class MainToolbarComponent implements IComponentOptions{
  //<main-toolbar></main-toolbar>
  static NAME = "mainToolbar";

  bindings:any = {
    user: '<?'
  };
  controller:Function = MainToolbarCtrl;
  controllerAs:string = '$ctrl';
  template:string = require('./main-toolbar-template.html');
}
