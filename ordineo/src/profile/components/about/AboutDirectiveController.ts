import {ProfileService} from "../../services/ProfileService";
import {IProfileService} from "../../services/ProfileService";
import {Employee} from "../../../core/models/employee";
import {ButtonState} from "../../../core/labels/ButtonState";
import IRootScopeService = angular.IRootScopeService;
import {LinkedInService} from "../../../social/linkedin/LinkedInService";
import {LinkedInController} from "../../../layout/linkedin/LinkedInController";

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

  //used for animations
  public height:string;

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
  }

  private init():void {
    this.footerButtonLabel = ButtonState.MORE;
    this.setIsCollapsed(true);
    this.isContentLoaded = false;
    this.isEditModeEnabled = false;
    this.hasError = false;
    this.rootScope.$on(LinkedInController.EVENT_SYNC_EMPLOYEE, ()=> {
      this.getEmployeeDataAsync(this.username, this.profileService, this.rootScope);
    });
  }

  setProfilePicture(pictureLocation:string):void {
    /*TODO remove conditional when image service can store linked in images*/
    if (pictureLocation.match(/http/)) {
      this.profilePicture = pictureLocation;
    } else {
      //TODO remove hardcoded string
      this.profilePicture = "https://gateway-ordineo.cfapps.io/image-ordineo/api/images/" + this.username;
    }
  }

  public setDescription(description:string):void {
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
    this.employee.unit.name = this.aboutInfoCache.unit.name;
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


  private setInfoCache():void {
    this.aboutInfoCache = {
      function: this.employee.function,
      description: this.employee.description,
      unit: {
        name: this.employee.unit.name
      }
    };
  }

  private setViewModelOnEmployeeDataFetched(_employee_:Employee):void {
    this.employee = _employee_;
    this.title = _employee_.firstName + ' ' + _employee_.lastName;
    this.setDescription(_employee_.description);
    this.setProfilePicture(_employee_.profilePicture);

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

}
