import IComponentOptions = angular.IComponentOptions;
import IAngularEvent = angular.IAngularEvent;
import {ActionButton} from "../../../core/components/action-button/ActionButtonComponent";
import {MilestoneService} from "../../services/MilestoneService";
import IPromise = Rx.IPromise;
import {ProfileService} from "../../services/ProfileService";
import IScope = angular.IScope;
import {SessionService} from "../../../auth/service/SessionService";
import "./milestone-styles.scss";

export class MilestoneContainerComponent implements IComponentOptions {
  static NAME: string = "milestoneContainer";
  controller: any = MilestoneContainerController;
  template: string = require("./MilestoneContainer-template.html");
}

export class MilestoneContainerController {
  public createMode: boolean;

  public actionButtons: Array<ActionButton> = [];

  private createButton: ActionButton;
  private saveButton: ActionButton;
  private cancelButton: ActionButton;

  private hasError: boolean;

  private errorMsg: string;

  private titleTimeline: string = "Timeline";
  private titleCreate: string = "Create milestone";
  public title: string;

  public username: string;
  public isContentLoaded: boolean = false;

  static $inject: string[] = [
    MilestoneService.NAME,
    ProfileService.NAME,
    SessionService.NAME,
    "$scope"
  ];

  constructor(private milestoneService: MilestoneService,
              private profileService: ProfileService,
              private sessionService: SessionService,
              private $scope: IScope) {
  }

  $onInit(): void {
    this.hasError = false;
    this.username = this.sessionService.getUsername();
    this.profileService.subscribeUsernameChanged(this.$scope, (evt: IAngularEvent, data: any) => {
      this.username = data.username;
      if (this.createMode) {
        this.toggleCreateMode();
      }
    });
    this.title = this.titleTimeline;
    this.configureCardHeaderButtons();
    this.createMode = false;
  }

  public onContentLoaded(isLoaded: boolean): void {
    this.isContentLoaded = isLoaded;
  }

  public isSaveEnabled(isEnabled: boolean): void {
    this.saveButton.isDisabled = !isEnabled;
  }

  private toggleCreateMode(): void {
    this.createMode = !this.createMode;
    if (this.createMode) {
      this.title = this.titleCreate;
      this.createButton.isActive = false;
      this.cancelButton.isActive = true;
      this.saveButton.isActive = true;
    } else {
      this.title = this.titleTimeline;
      this.createButton.isActive = true;
      this.cancelButton.isActive = false;
      this.hasError = false;
      this.saveButton.isActive = false;
    }
  }

  private configureCardHeaderButtons(): void {
    this.initCreateButton();
    this.actionButtons.push(this.createButton);

    this.initSaveButton();
    this.actionButtons.push(this.saveButton);

    this.initCancelButton();
    this.actionButtons.push(this.cancelButton);
  }

  private initCreateButton(): void {
    this.createButton = {
      label: "Create milestone",
      isActive: true,
      svgSrc: "content:add_circle",
      aClass: "btnCreate",
      onClick: (createButton: ActionButton): void => {
        this.toggleCreateMode();
      },
    };
  }

  private initSaveButton(): void {
    this.saveButton = {
      label: "Save milestone",
      isActive: false,
      svgSrc: "act:done",
      aClass: "btnSave",
      onClick: (saveButton: ActionButton): void => {
        var promise: IPromise<any> = this.milestoneService.createMilestoneByUsername(this.profileService.username);
        if (promise) {
          promise.then((success: any) => {
            this.toggleCreateMode();
          }, (error: any) => {
            if (error.status === 409) {
              this.errorMsg = "You already have a milestone " + this.milestoneService.milestone.title;
            } else if (error.status > 500) {
              this.errorMsg = "check your connection";
            } else if (error.status >= 400 && error.status < 500) {
              this.errorMsg = "Please select a correct objective";
            } else {
              this.errorMsg = "Something went wrong";
            }
            this.hasError = true;
          });
        } else {
          this.errorMsg = "Please select a correct objective";
          this.hasError = true;
        }
      },
    };
  }

  private initCancelButton(): void {
    this.cancelButton = {
      label: "Cancel milestone",
      isActive: false,
      svgSrc: "act:highlight_off",
      aClass: "btnCancel",
      onClick: (cancelButton: ActionButton): void => {
        this.toggleCreateMode();
      },
    };
  }
}
