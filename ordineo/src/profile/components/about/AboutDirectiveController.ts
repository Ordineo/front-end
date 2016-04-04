import {ProfileService, IProfileService} from "../../services/ProfileService";
import {Employee} from "../../../core/models/employee";
import {ButtonState} from "../../../core/labels/ButtonState";
import {LinkedInService} from "../../../social/linkedin/LinkedInService";
import {LinkedInController} from "../../../layout/linkedin/LinkedInController";
import {HeaderController} from "../../../layout/header/HeaderController";
import {GatewayApiService} from "../../../gateway/service/GatewayApiService";
import IRootScopeService = angular.IRootScopeService;
import IAngularEvent = angular.IAngularEvent;

export class AboutDirectiveController {
  public title:string;
  public username:string;

  employee:Employee;
  public aboutInfoCache:Employee;

  public shortDescription:string;
  public footerButtonLabel:string;
  public profilePicture:string;

  public isContentLoaded:boolean;
  public isEditModeEnabled:boolean;
  public isCollapsed:boolean;
  public hasError:boolean;
  public genders:Array<string>;

  //used for animations
  public height:any;

  static $inject:Array<string> = [
    ProfileService.NAME,
    '$rootScope',
    LinkedInService.SERVICE_NAME
  ];

  static EVENT_ON_EMPLOYEEDATA_SET:string = "event_on_employee_data_set";

  constructor(public profileService:IProfileService, private rootScope:IRootScopeService, private linkedin:LinkedInService) {
    this.init();

    if (window.sessionStorage.getItem(LinkedInController.SESSION_ITEM)) {
      //when this session item was set it means we came from an auth page.
      //we need to request a sync again from linkedin
      this.linkedin.requestSync(this.username);
      window.sessionStorage.removeItem('linkedin');
    }

    if (this.username) {
      this.getEmployeeDataAsync(this.username, profileService, rootScope);
    }

    this.genders = [
      "MALE",
      "FEMALE",
      "TRANSGENDER"
    ];
  }

  setProfilePicture(userName:string):void {
    this.profilePicture = GatewayApiService.getImagesEmployeeApi() + userName;
  }

  setDescription(description:string):void {
    if (description !== null) {
      this.employee.description = description;
      if (description.length < 366) {
        this.shortDescription = description;
      } else {
        this.shortDescription = description.substr(0, 362) + ' ...';
      }
    }
  }

  onExpandCollapseButtonClick():void {
    this.isCollapsed = !this.isCollapsed;
    if (this.isCollapsed) {
      this.footerButtonLabel = ButtonState.MORE
    } else {
      this.footerButtonLabel = ButtonState.COLLAPSE;
    }
  }

  onEdit():void {
    this.isEditModeEnabled = !this.isEditModeEnabled;
    this.setInfoCache();
  }

  setIsCollapsed(isCollapsed:boolean):void {
    this.isCollapsed = isCollapsed;
  }

  onCancel():void {
    this.isEditModeEnabled = false;
    this.restore();
  }

  restore():void {
    this.employee.function = this.aboutInfoCache.function;
    this.employee.unit = this.aboutInfoCache.unit;
    this.employee.description = this.aboutInfoCache.description;
  }

  onSubmit():void {
    this.setDescription(this.employee.description);
    this.isContentLoaded = false;

    this.profileService.putEmployeeData(this.employee)
      .then((ok)=> {
        this.getEmployeeDataAsync(this.username, this.profileService, this.rootScope);
      }, (err)=> {
        console.log(err)
      });

    this.isEditModeEnabled = false;
  }

  private onUserSelectedListener(event:IAngularEvent, data:any):void{
    /* istanbul ignore next */
    this.username = data.username;
    this.getEmployeeDataAsync(this.username, this.profileService, this.rootScope);
  }

  private onSyncEmployeeListener():void{
    this.getEmployeeDataAsync(this.username, this.profileService, this.rootScope);
  }

  private init():void {
    this.footerButtonLabel = ButtonState.MORE;
    this.setIsCollapsed(true);
    this.isContentLoaded = false;
    this.isEditModeEnabled = false;
    this.hasError = false;
    this.rootScope.$on(HeaderController.EVENT_USER_SELECTED, this.onUserSelectedListener);
    this.rootScope.$on(LinkedInController.EVENT_SYNC_EMPLOYEE, this.onSyncEmployeeListener);
  }

  private setInfoCache():void {
    this.aboutInfoCache = {
      function: this.employee.function,
      description: this.employee.description,
      unit: this.employee.unit
    };
  }

  private setViewModelOnEmployeeDataFetched(_employee_:Employee):void {
    this.employee = _employee_;
    this.title = _employee_.firstName + ' ' + _employee_.lastName;
    this.setDescription(_employee_.description);
    this.setProfilePicture(_employee_.username);
    this.employee.startDateTypeDate = new Date(_employee_.startDate);

    this.isContentLoaded = true;
  }

  private broadCastOnEmployeeDataSet(employee:Employee, rootScope:IRootScopeService) {
    rootScope.$broadcast(AboutDirectiveController.EVENT_ON_EMPLOYEEDATA_SET, {
      username: employee.username,
      firstName: employee.firstName
    });
  }

  private getEmployeeDataAsync(_userName_:string, profileService:IProfileService, rootScope:IRootScopeService):void {
    this.isContentLoaded = false;
    profileService
      .getAboutInfoByUsername(_userName_)
      .then((employeeData:any)=> {
        this.isContentLoaded = true;
        this.broadCastOnEmployeeDataSet(employeeData, rootScope);
        this.setViewModelOnEmployeeDataFetched(employeeData);
      }, (onErrorData)=> {
        console.log(onErrorData);
        this.isContentLoaded = false;
        this.hasError = true;
      });
  }

  private changeStartDate() {
    var date = new Date();
    date.setDate(this.employee.startDateTypeDate.getDate());
    this.employee.startDate = JSON.stringify(date).substring(1, JSON.stringify(date).indexOf('T'));
    //console.log(this.employee.startDate);
  }
}
