import IComponentOptions = angular.IComponentOptions;
import 'angular-material';

/**
 * @ngdoc component
 * @name actionButton
 * @module jworks360.core
 *
 *
 * @description
 * The `<action-button>` is a dumb component meant for adding extra buttons to `<card-header>`.
 * This component depends on angular material
 *
 * @usage
 *
 * @input svg-src md-svg-src for an md-button, check out angular material docs
 * @input is-active flag to put the element in the DOM tree, if false the element is removed from the dom
 * @input is-disabled set the button disabled/selectable
 * @input a-class add css styles
 * @input label add an aria-label
 * @output on-click callback function to communicate with the parent controller when the button gets clicked
 *
 *  <action-button
 *     label="Drag button"
 *     on-click="$ctrl.handleDragButtonClick(mouseCoords)"
 *     svg-src="content:new"
 *     is-active="$ctrl.isDragButtonActive"
 *     is-disabled="$ctrl.isDisabled"
 *     a-class="$ctrl.dragButtonStyles">
 *   </action-button>
 */

export class ActionButtonComponent implements IComponentOptions {
  static NAME:string = "actionButton";

  bindings:any = {
    label: '@',
    onClick: '&',
    isActive: '<',
    svgSrc: '@',
    isDisabled: '<',
    aClass: '@'
  };

  template:string = `
        <md-button
          ng-disabled="$ctrl.isDisabled"
          aria-label="{{$ctrl.label}}"
          ng-if="$ctrl.isActive"
          ng-click="$ctrl.click()"
          class="md-icon-button {{$ctrl.aClass}}">
          <md-icon md-svg-src="{{$ctrl.svgSrc}}"></md-icon>
        </md-button>
  `;
  controller:Function = ActionButtonController;
}
export class ActionButtonController implements ActionButton {
  label:string;
  isActive:boolean;
  svgSrc:string;
  isDisabled:boolean;
  aClass:string;
  public onClick:Function;

  click():void {
    this.onClick({btn: this});
  }
}
export interface ActionButton {
  label?:string,
  onClick?:Function,
  isActive?:boolean,
  svgSrc?:string,
  isDisabled?:boolean,
  aClass?:string
}
