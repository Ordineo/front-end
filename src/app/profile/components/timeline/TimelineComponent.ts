import IComponentOptions = angular.IComponentOptions;
import {Milestone} from "../../../core/models/milestone";
import {TimelineService} from "../../services/TimelineService";
import IScope = angular.IScope;
import {HeaderController} from "../../../layout/header/HeaderController";
import IAngularEvent = angular.IAngularEvent;
import {ActionButtonConfig} from "../../../core/components/action-button/ActionButtonComponent";
require('./timeline-styles.scss');

export class TimelineComponent implements IComponentOptions {
  static NAME:string = "timeline";
  controller:any = TimelineController;
  template:string = require('./TimelineComponent-template.html');
  bindings:any = {
    username: '@'
  };
}

export class TimelineController {
  public actionButtons:Array<ActionButtonConfig> = [];

  public createButton:ActionButtonConfig;

  public saveButton:ActionButtonConfig = {
    label: 'save milestone',
    isActive: false,
    onClick: this.save,
    svgSrc: 'act:done'
  };

  public cancelButton:ActionButtonConfig = {
    label: 'cancel create milestone',
    isActive: false,
    onClick: this.cancel,
    svgSrc: 'act:highlight_off'
  };

  public title:string = "Timeline";
  public milestones:Milestone[];
  public username:string;
  public isContentLoaded:boolean;

  static $inject = [TimelineService.NAME, '$rootScope'];

  constructor(private timelineService:TimelineService, private rootScope:IScope) {
  }

  $onInit():void {
    this.isContentLoaded = false;
    this.configureCardHeaderButtons();
    this.addEventListener(HeaderController.EVENT_USER_SELECTED, this.rootScope);
    if (this.username) {
      this.getMilestoneDataAsync();
    } else {
      this.isContentLoaded = true;
    }
  }

  addEventListener(eventName:string, scope:IScope):void {
    scope.$on(eventName, (evt:IAngularEvent, data:any)=> {
      this.username = data.username;
      this.getMilestoneDataAsync();
    });
  }

  configureCardHeaderButtons():void {
    this.initCreateButton();
    this.actionButtons.push(this.createButton);


    this.actionButtons.push(configureSaveButton());
    this.actionButtons.push(configureCancelButton());
  }

  initCreateButton():void {
    this.createButton = {
      label: 'Create milestone',
      isActive: true,
      svgSrc: 'content:add_circle',
      onClick: (selectedButton:ActionButtonConfig)=> {
        selectedButton.isActive = !selectedButton.isActive;
      },
    };
  }

  initSaveButton():void {
    this.saveButton= {
      label: 'Save milestone',
      isActive: false,
      svgSrc: 'act:done',
      onClick: (selectedButton:ActionButtonConfig)=> {
        selectedButton.isActive = !selectedButton.isActive;
      },
    };
  }

  initCancelButton():void {
    this.cancelButton = {
      label: 'Cancel milestone',
      isActive: false,
      svgSrc: 'act:highlight_off',
      onClick: (selectedButton:ActionButtonConfig)=> {
        selectedButton.isActive = !selectedButton.isActive;
      },
    };
  }

  getMilestoneDataAsync():void {
    this.isContentLoaded = false;
    this.timelineService.getMilestonesByUsername(this.username)
      .then((milestones:Milestone[])=> {
          this.milestones = milestones;
          this.isContentLoaded = true;
        }, (onError)=> {
          console.log(onError);
        }
      );
  }
}
