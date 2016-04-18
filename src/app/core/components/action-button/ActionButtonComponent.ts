import IComponentOptions = angular.IComponentOptions;
export class ActionButtonComponent implements IComponentOptions {
  static NAME:string = "actionButton";

  bindings:any = {
    label: '@',
    onClick: '&',
    isActive: '<',
    svgSrc: '@',
    isDisabled: '<'
  };

  template:string = `
        <md-button
          ng-disabled="$ctrl.isDisabled"
          aria-label="{{$ctrl.label}}"
          ng-if="$ctrl.isActive"
          ng-click="$ctrl.click()"
          class="md-icon-button">
          <md-icon md-svg-src="{{$ctrl.svgSrc}}"></md-icon>
        </md-button>
  `;
  controller:Function = ActionButtonController;
}
export class ActionButtonController{
  public onClick:Function;

  click():void{
    this.onClick({btn: this});
  }
}
export interface ActionButton {
  label?:string,
  onClick?:Function,
  isActive?:boolean,
  svgSrc?:string,
  isDisabled?:boolean
}
