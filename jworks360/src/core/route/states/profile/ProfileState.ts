import {IState} from "angular-ui-router";
import IControllerProvider = angular.IControllerProvider;
import {PersonsService} from "../../../../persons/service/PersonService";
import {PERSONS_SERVICE} from "../../../../persons/service/PersonService";
import {IPersonsDataService} from "../../../../persons/service/PersonService";

export class ProfileState implements IState {
  static NAME:string = "profileState";

  name:string = ProfileState.NAME;
  url:string = '/profile';
  controller:Function = ProfileStateCtrl;
  controllerAs:string = '$profile';
  template:string = require('./profile-state.html');
}

export class ProfileStateCtrl {

  static $inject:Array<string> = [PERSONS_SERVICE];

  constructor(private personsService:IPersonsDataService) {
    //this.personsService.getAllPersons()
    //  .then(this.onSuccess, this.onError);
  }

  private onSuccess():void{
    console.log("success");
  }

  private onError():void{
    console.log("error");
  }
}
