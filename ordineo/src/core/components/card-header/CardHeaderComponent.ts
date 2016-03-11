require('./card-header-styles.scss');
import IComponentOptions = angular.IComponentOptions;

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

