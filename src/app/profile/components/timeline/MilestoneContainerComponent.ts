import IComponentOptions = angular.IComponentOptions;
import IScope = angular.IScope;
import IAngularEvent = angular.IAngularEvent;
import {ActionButton} from "../../../core/components/action-button/ActionButtonComponent";
require('./milestone-styles.scss');

export class MilestoneContainerComponent implements IComponentOptions {
  static NAME:string = "milestoneContainer";
  controller:any = MilestoneContainerController;
  template:string = require('./MilestoneContainer-template.html');
  bindings:any = {
    username: '@'
  };
}

export class MilestoneContainerController {
  public createMode:boolean;

  public actionButtons:Array<ActionButton> = [];

  private createButton:ActionButton;
  private saveButton:ActionButton;
  private cancelButton:ActionButton;

  public title:string = "Timeline"; //todo
  public username:string;
  public isContentLoaded:boolean = false;

  constructor() {
  }

  $onInit():void {
    this.configureCardHeaderButtons();
    this.createMode = false;
  }

  public onContentLoaded(isLoaded:any):void {
    this.isContentLoaded = isLoaded;
  }
  
  public isSaveEnabled(isEnabled:any):void {
    this.saveButton.isDisabled = !isEnabled;
  }

  private toggleCreateMode():void {
    this.createMode = !this.createMode;
    if (this.createMode) {
      this.createButton.isActive = false;
      this.cancelButton.isActive = true;
      this.saveButton.isActive = true;
    } else {
      this.createButton.isActive = true;
      this.cancelButton.isActive = false;
      this.saveButton.isActive = false;
    }
  }

  private configureCardHeaderButtons():void {
    this.initCreateButton();
    this.actionButtons.push(this.createButton);

    this.initSaveButton();
    this.actionButtons.push(this.saveButton);

    this.initCancelButton();
    this.actionButtons.push(this.cancelButton);
  }

  private initCreateButton():void {
    this.createButton = {
      label: 'Create milestone',
      isActive: true,
      svgSrc: 'content:add_circle',
      onClick: (createButton:ActionButton)=> {
        this.toggleCreateMode();
      },
    };
  }

  private initSaveButton():void {
    this.saveButton = {
      label: 'Save milestone',
      isActive: false,
      svgSrc: 'act:done',
      onClick: (saveButton:ActionButton)=> {
        this.toggleCreateMode();
      },
    };
  }

  private initCancelButton():void {
    this.cancelButton = {
      label: 'Cancel milestone',
      isActive: false,
      svgSrc: 'act:highlight_off',
      onClick: (cancelButton:ActionButton)=> {
        this.toggleCreateMode();
      },
    };
  }
}
