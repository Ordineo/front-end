import {ProfileService, IProfileService} from "../services/ProfileService";
import {ButtonState} from "../../core/labels/ButtonState";
import {LinkedInService} from "../../social/linkedin/LinkedInService";
import {LinkedInController} from "../../layout/linkedin/LinkedInController";
import {GatewayApiService} from "../../gateway/service/GatewayApiService";
import IRootScopeService = angular.IRootScopeService;
import IAngularEvent = angular.IAngularEvent;
import ISCEService = angular.ISCEService;
import IScope = angular.IScope;
import {SessionService} from "../../auth/service/SessionService";
import {Employee} from "../../core/models/employee";

export class AboutDirectiveController {
  public title: string;
  public alphanumeric: RegExp = /^[a-z0-9 \-]+$/i;
  public username: string;

  employee: Employee;
  public aboutInfoCache: Employee;
  public imageSelected: boolean;

  public shortDescription: string;
  public footerButtonLabel: string;
  public profilePicture: string;

  public isContentLoaded: boolean;
  public isEditModeEnabled: boolean;
  public isCollapsed: boolean;
  public hasError: boolean;
  public genders: Array<string>;

  public height: any;

  public myFile: any;
  public imgUrl: string;

  static $inject: Array<string> = [
    SessionService.NAME,
    "$scope",
    "$sce",
    ProfileService.NAME,
    "$rootScope",
    LinkedInService.SERVICE_NAME
  ];

  static EVENT_ON_EMPLOYEEDATA_SET: string = "event_on_employee_data_set";

  constructor(private sessionsService: SessionService,
              private scope: IScope,
              private $sce: ISCEService,
              public profileService: ProfileService,
              private rootScope: IRootScopeService,
              private linkedin: LinkedInService) {
    this.init();
    if (window.sessionStorage.getItem(LinkedInController.SESSION_ITEM)) {
      // when this session item was set it means we came from an auth page.
      // we need to request a sync again from linkedin
      this.linkedin.requestSync(this.username);
      window.sessionStorage.removeItem("linkedin");
    }
    this.getEmployeeDataAsync(this.username, profileService, rootScope);
  }

  setProfilePicture(userName: string): void {
    this.profilePicture = GatewayApiService.getImagesEmployeeApi() + userName + "?" + new Date().getTime();
  }

  setDescription(description: string): void {
    if (description !== null) {
      if (description.length < 366) {
        this.shortDescription = description;
      } else {
        this.shortDescription = description.substr(0, 362) + "...";
      }
    }
  }

  onExpandCollapseButtonClick(): void {
    this.isCollapsed = !this.isCollapsed;
    if (this.isCollapsed) {
      this.footerButtonLabel = ButtonState.MORE;
    } else {
      this.footerButtonLabel = ButtonState.COLLAPSE;
    }
  }

  test(): void {
    console.log(this.imageSelected);
    this.imageSelected = true;
  }

  onEdit(): void {
    this.isEditModeEnabled = !this.isEditModeEnabled;
    this.setInfoCache();
  }

  setIsCollapsed(isCollapsed: boolean): void {
    this.isCollapsed = isCollapsed;
  }

  onCancel(): void {
    this.isEditModeEnabled = false;
    this.restore();
  }

  restore(): void {
    this.employee.function = this.aboutInfoCache.function;
    this.employee.unit = {
      name: this.aboutInfoCache.unit
    };
    this.employee.description = this.aboutInfoCache.description;
  }

  onSubmit(): void {
    this.setDescription(this.employee.description);
    this.isContentLoaded = false;

    this.profileService.putEmployeeData(this.employee)
      .then((data) => {
        this.getEmployeeDataAsync(this.username, this.profileService, this.rootScope);
      });

    this.isEditModeEnabled = false;
  }

  private init(): void {
    this.username = this.profileService.username;
    this.genders = [
      "MALE",
      "FEMALE",
      "TRANSGENDER"
    ];
    this.imageSelected = false;
    this.footerButtonLabel = ButtonState.MORE;
    this.setIsCollapsed(true);
    this.isContentLoaded = false;
    this.isEditModeEnabled = false;
    this.hasError = false;
    this.profileService.subscribeUsernameChanged(this.scope, (evt: IAngularEvent, data: any) => {
      this.username = data.username;
      this.isEditModeEnabled = false;
      this.getEmployeeDataAsync(this.username, this.profileService, this.rootScope);
    });
    this.rootScope.$on(LinkedInController.EVENT_SYNC_EMPLOYEE, () => {
      this.getEmployeeDataAsync(this.username, this.profileService, this.rootScope);
    });
  }

  private setInfoCache(): void {
    this.aboutInfoCache = {
      function: this.employee.function,
      description: this.employee.description,
      unit: this.employee.unit.name
    };
  }

  private setViewModelOnEmployeeDataFetched(empl: Employee): void {
    if (!empl.unit) {
      empl.unit = {name: "tes"};
    }
    this.employee = empl;
    this.title = empl.firstName + " " + empl.lastName;
    this.setDescription(empl.description);
    this.setProfilePicture(empl.username);
    this.employee.startDateTypeDate = new Date(empl.startDate);
    this.$sce.trustAsResourceUrl("https://gateway-ordineo.cfapps.io/image-ordineo/api/images/" + empl.username);
    this.imgUrl = "https://gateway-ordineo.cfapps.io/image-ordineo/api/images/" + empl.username;

    this.isContentLoaded = true;
  }

  private broadCastOnEmployeeDataSet(employee: Employee, rootScope: IRootScopeService): void {
    rootScope.$broadcast(AboutDirectiveController.EVENT_ON_EMPLOYEEDATA_SET, {
      username: employee.username,
      firstName: employee.firstName,
      lastName: employee.lastName
    });
  }

  private getEmployeeDataAsync(usr: string, profileService: IProfileService, rootScope: IRootScopeService): void {
    this.imageSelected = false;
    this.isContentLoaded = false;
    profileService
      .getAboutInfoByUsername(usr)
      .then((employeeData: any) => {
        this.isContentLoaded = true;
        this.setProfilePicture(this.username);
        this.broadCastOnEmployeeDataSet(employeeData, rootScope);
        this.setViewModelOnEmployeeDataFetched(employeeData);
      }, (onErrorData) => {
        console.log(onErrorData);
        this.isContentLoaded = false;
        this.hasError = true;
      });
  }

  changeStartDate(): void {
    var date = new Date();
    date.setDate(this.employee.startDateTypeDate.getDate());
    this.employee.startDate = JSON.stringify(date).substring(1, JSON.stringify(date).indexOf("T"));
  }

  previewPicture(event: IAngularEvent): void {
    var output: any = document.getElementById("profilePicturePreview");
    output.src = URL.createObjectURL(event["target"].files[0]);
  }

  changePicture(): void {
    var file = this.myFile;
    this.profileService.setProfilePicture(file, this.imgUrl)
      .then((data) => {
        console.log("uploaded");
        this.getEmployeeDataAsync(this.username, this.profileService, this.rootScope);
        this.isEditModeEnabled = false;
      }, (data) => {
        console.log("Profile picture could not be set");
        console.log(data);
      });
  }
}
