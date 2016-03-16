import {ProfileService} from "../../services/ProfileService";
import {IProfileService} from "../../services/ProfileService";
import {IAboutModel} from "./IAboutModel";

interface IAboutDirective {
  functie:string;
  unit:string;
  description:string;
  username:string;
  isContentLoaded:boolean;
  isEditModeEnabled:boolean;
  title:string;
}

export class AboutDirectiveController implements IAboutDirective {
  public functie:string = '';
  public unit:string = '';
  public description:string = '';
  public username:string;
  public isContentLoaded:boolean = false;
  public isEditModeEnabled:boolean = false;
  public aboutInfoCache:IAboutModel;
  public title:string = 'About Myself';

  static $inject:Array<string> = [ProfileService.NAME];

  constructor(private profileService:IProfileService) {
    profileService.getAboutInfoByUsername(this.username)
      .then((data:any)=> {
        this.functie = data.function;
        this.unit = data.unit.name;
        this.description = data.description;
        this.title = data.firstName + ' ' + data.lastName;
        this.isContentLoaded = true;
      }, (error:any)=> {
        profileService.getMock().then((data:any)=> {
          this.functie = data.info.functie;
          this.unit = data.info.unit;
          this.description = data.info.description;
          this.isContentLoaded = true;
        });
      });
  }

  public onEdit():void{
    this.isEditModeEnabled = !this.isEditModeEnabled;
    this.aboutInfoCache = {
      functie: this.functie,
      description: this.description,
      unit: this.unit
    };
  }

  public onCancel():void{
    this.isEditModeEnabled = false;
    this.restore();
  }

  public restore():void{
    this.functie = this.aboutInfoCache.functie;
    this.unit = this.aboutInfoCache.unit;
    this.description = this.aboutInfoCache.description;
  }

  public onSubmit():void{
    //todo make a post request and submit data
    this.isEditModeEnabled = false;
  }
}
