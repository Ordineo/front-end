import IComponentOptions = angular.IComponentOptions;
import IScope = angular.IScope;
import IAngularEvent = angular.IAngularEvent;
import {ActionButton} from "../../../core/components/action-button/ActionButtonComponent";
import {MilestoneService, IMilestoneService} from "../../services/MilestoneService";
import {HeaderController} from "../../../layout/header/HeaderController";
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

  private hasError:boolean;

  private errorMsg:string;

  public title:string = "Timeline"; //todo
  public username:string;
  public isContentLoaded:boolean = false;

  static $inject = [MilestoneService.NAME, '$rootScope'];

  constructor(private milestoneService:MilestoneService, private rootScope:IScope) {
  }

  $onInit():void {
    this.hasError = false;
    this.rootScope.$on(HeaderController.EVENT_USER_SELECTED, (evt:IAngularEvent, data:any)=> {
      this.username = data.username;
      if(this.createMode) {
        this.toggleCreateMode();
      }
    });
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
      this.hasError = false;
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
        this.milestoneService.createMilestoneByUsername(this.username).then((success:any)=> {
          this.toggleCreateMode();
        }, (error:any)=> {
          if (error.status === 409) {
            this.errorMsg = "You already have a milestone " + this.milestoneService.milestone.title;
          } else if (error.status > 500) {
            this.errorMsg = "check your connection";
          } else if (error.status >= 400 && error.status < 500) {
            this.errorMsg = "Please select a correct objective"
          } else {
            this.errorMsg = "Something went wrong";
          }
          this.hasError = true;
        });
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
