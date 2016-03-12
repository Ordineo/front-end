import {ProfileService} from "../../services/ProfileService";
import {IProfileService} from "../../services/ProfileService";
interface IAboutDirective {
  functie:string;
  unit:string;
  description:string;
  username:string;
}

export class AboutDirectiveController implements IAboutDirective {
  public functie:string = '';
  public unit:string = '';
  public description:string = '';
  public username:string = '';

  static $inject:Array<string> = [ProfileService.NAME];

  constructor(private profileService:IProfileService) {
    profileService.getAboutInfo(this.username)
      .then((data:any)=> {
        this.functie = data.info.functie;
        this.unit = data.info.unit;
        this.description = data.info.description;
      }, ()=>{});
  }

}
