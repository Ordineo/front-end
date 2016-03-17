import {ProfileService} from "../../services/ProfileService";
import {IProfileService} from "../../services/ProfileService";
import {IAboutModel} from "./IAboutModel";

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

  static $inject:Array<string> = [
    ProfileService.NAME,
  ];

  constructor(public profileService:IProfileService) {
    this.isContentLoaded = false;
    this.setIsCollapsed(true);
    this.hasError = false;
    this.setInfoCache();
    if (this.username) {
      profileService.getAboutInfoByUsername(this.username)
        .then((data:any)=> {
          this.functie = data.function;
          this.unit = data.unit.name;
          this.description = data.description;
          this.title = data.firstName + ' ' + data.lastName;
          this.isContentLoaded = true;
        }, (error:any)=> {
          this.isContentLoaded = false;
          this.hasError = true;
        });
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
    if (this.description) {
      if (isCollapsed) {
        this.shortDescription = this.description.substr(1, 365);
      } else {
        this.description = this.aboutInfoCache.description;
      }
    }
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
