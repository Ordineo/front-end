import {ProfileService} from "../../services/ProfileService";
import {IProfileService} from "../../services/ProfileService";
import {IAboutModel} from "./IAboutModel";
import {employee} from "../../../core/models/employee";
import {ButtonState} from "../../../core/labels/ButtonState";

export interface IAboutDirective {
  functie:string;
  unit:string;
  description:string;
  shortDescription:string;
  username:string;
  isContentLoaded:boolean;
  isEditModeEnabled:boolean;
  title:string;
  aboutInfoCache:IAboutModel;
  hasError:boolean;
  isCollapsed:boolean;
  setIsCollapsed:Function;
  endDate:string
  footerButtonLabel:string;
}

export class AboutDirectiveController implements IAboutDirective {
  public functie:string;
  public unit:string;
  public shortDescription:string;
  public description:string;
  public isContentLoaded:boolean;
  public isEditModeEnabled:boolean;
  public aboutInfoCache:IAboutModel;
  public title:string;
  public username:string;
  public isCollapsed:boolean;
  public hasError:boolean;
  public endDate:string;
  public footerButtonLabel:string;
  public startDate:string;
  public gender:string;
  public height:string;

  static $inject:Array<string> = [
    ProfileService.NAME,
  ];

  constructor(public profileService:IProfileService) {
    this.footerButtonLabel = ButtonState.MORE;
    this.isContentLoaded = false;
    this.title = "About myself";
    this.setIsCollapsed(true);
    this.isEditModeEnabled = false;
    this.hasError = false;
    this.setInfoCache();
    if (this.username) {
      profileService.getAboutInfoByUsername(this.username)
        .then((data:employee)=> {
          this.functie = data.function;
          this.unit = data.unit.name;
          this.setDescription(data.description);
          this.endDate = data.resignationDate;
          this.startDate = data.startDate;
          this.gender = data.gender;
          this.title = data.firstName + ' ' + data.lastName;
          this.isContentLoaded = true;
        }, (error:any)=> {
          this.isContentLoaded = false;
          this.hasError = true;
        });
    }
  }

  setDescription(description:string):void {
    this.description = description;
    if (description.length < 366) {
      this.shortDescription = description;
    } else {
      this.shortDescription = description.substr(0, 362) + ' ...';
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
    this.aboutInfoCache = {
      functie: this.functie,
      description: this.description,
      unit: this.unit
    };
  }

  setIsCollapsed(isCollapsed:boolean):void {
    this.isCollapsed = isCollapsed;
  }

  private setInfoCache():void {
    this.aboutInfoCache = {
      functie: this.functie,
      description: this.description,
      unit: this.unit
    };
  }

  onCancel():void {
    this.isEditModeEnabled = false;
    this.restore();
  }

  restore():void {
    this.functie = this.aboutInfoCache.functie;
    this.unit = this.aboutInfoCache.unit;
    this.description = this.aboutInfoCache.description;
  }

  onSubmit():void {
    //todo make a post request and submit data
    this.isEditModeEnabled = false;
  }
}
