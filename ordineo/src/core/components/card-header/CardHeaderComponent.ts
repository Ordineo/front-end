require('./card-header-styles.scss');
import IComponentOptions = angular.IComponentOptions;

/**
 * @ngdoc component
 * @name cardHeader
 * @module ordineo.core
 *
 * @restrict E
 *
 * @usage
 * <card-header title="About myself" onEditClick="$ctrl.func()" onDragClick="$ctrl.func()">
 * </card-header>
 */

interface CardHeaderScope{
  title:string;
  onEditClick:Function;
  onDragClick:Function;
}
export class CardHeaderComponent implements IComponentOptions{
  static NAME:string = "cardHeader";
  controller:Function = CardHeaderController;
  controllerAs:string = '$ctrl';
  template:string = require('./card-header-template.html');
  bindings:any = {
    title: '@',
    onEditClick:'&',
    onDragClick:'&'
  };

}
export class CardHeaderController implements CardHeaderScope{
  public title:string;
  public onEditClick:Function;
  public onDragClick:Function;
}

