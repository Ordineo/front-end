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
export class CardHeaderComponent implements IComponentOptions {
  static NAME:string = "cardHeader";
  controller:Function = CardHeaderController;
  controllerAs:string = '$ctrl';
  template:string = require('./card-header-template.html');
  bindings:any = {
    title: '@',
    onEditClick: '&',
    onDragClick: '&',
    onSaveClick: '&',
    onCancelClick: '&',
    showBtnDrag: '=?',
    showBtnEdit: '=?',
    showBtnCancel: '=?',
    showBtnSave: '=?',
    isSaveDisabled: '=?'
  };
}

interface CardHeaderScope {
  title:string;
  isSaveDisabled:boolean;
  onEditClick?:Function;
  onDragClick?:Function;
  showBtnDrag?:boolean;
  showBtnEdit?:boolean;
  showBtnCancel?:boolean;
  showBtnSave?:boolean;
}

export class CardHeaderController implements CardHeaderScope {
  public title:string;
  isSaveDisabled:boolean;
  public onEditClick:Function;
  public onDragClick:Function;
  public onSaveClick:Function;
  public onCancelClick:Function;
  public showBtnDrag:boolean = true;
  public showBtnEdit:boolean = true;
  public showBtnCancel:boolean = false;
  public showBtnSave:boolean = false;

  public save():void {
    this.normalMode();
    this.onSaveClick();
  }

  public cancel():void {
    this.normalMode();
    this.onCancelClick();
  }

  public normalMode():void {
    this.showBtnEdit = true;
    this.showBtnCancel = false;
    this.showBtnSave = false;
  }

  public editMode():void {
    this.showBtnEdit = false;
    this.showBtnCancel = true;
    this.showBtnSave = true;
    this.onEditClick();
  }
}

