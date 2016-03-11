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
 * <card-header
 *      title="About myself"
 *      onEditClick="$ctrl.func()"
 *      onDragClick="$ctrl.func()"
 *      show-btn-edit="false"
 *      show-btn-drag="true"
 *      >
 * </card-header>
 */

interface CardHeaderScope{
  title:string;
  onEditClick:Function;
  onDragClick:Function;
  showBtnDrag:boolean;
  showBtnEdit:boolean;
}
export class CardHeaderComponent implements IComponentOptions{
  static NAME:string = "cardHeader";
  controller:Function = CardHeaderController;
  controllerAs:string = '$ctrl';
  template:string = require('./card-header-template.html');
  bindings:any = {
    title: '@',
    onEditClick:'&',
    onDragClick:'&',
    showBtnDrag:'=?',
    showBtnEdit:'=?'
  };

}
export class CardHeaderController implements CardHeaderScope{
  public title:string;
  public onEditClick:Function;
  public onDragClick:Function;
  public showBtnDrag:boolean = true;
  public showBtnEdit:boolean = true;
}

