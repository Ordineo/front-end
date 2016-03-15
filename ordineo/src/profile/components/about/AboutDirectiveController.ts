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
}

export class AboutDirectiveController implements IAboutDirective {
  public functie:string = '';
  public unit:string = '';
  public description:string = '';
  public username:string;
  public isContentLoaded:boolean = false;
  public isEditModeEnabled:boolean = false;
  public aboutInfoCache:IAboutModel;

  static $inject:Array<string> = [ProfileService.NAME];

  constructor(private profileService:IProfileService) {
    console.log(this.username);
    profileService.getAboutInfoByUsername(this.username)
      .then((data:any)=> {
        this.functie = data.function;
        this.unit = data.unit.name;
        this.description = data.description;
        this.isContentLoaded = true;
      }, (error:any)=> {
        console.log(error);
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
