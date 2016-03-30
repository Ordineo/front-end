import {ProfileService} from "../../profile/services/ProfileService";
export class HeaderController{
  public button:any;

  static $inject = [ProfileService.NAME];

  constructor(private profileService:ProfileService){
    this.button = {title: 'search', icon: 'act:search'};
  }

  $onInit():void{
    this.profileService.getAllEmployees()
      .then((ok)=>{
        console.log(ok);
      });
  }
}
