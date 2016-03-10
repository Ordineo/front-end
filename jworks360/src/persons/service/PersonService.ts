import 'angular';
import {GatewayApiService} from "../../gateway/service/GatewayApiService";
import {Person} from "../model/person";
import IPromise = angular.IPromise;
import {TraversonHalService} from "../../traverson/service/TraversonHalService";

export const PERSONS_SERVICE = "jworks360.persons.service";

export interface IPersonsDataService {
  getPersonByUserName(userName:string):IPromise<any>;
  getAllPersons():IPromise<any>;
}

export class PersonsService implements IPersonsDataService {

  static $inject:Array<string> = [
    GatewayApiService.SERVICE_NAME,
    TraversonHalService.SERVICE_NAME
  ];

  constructor(private gate:GatewayApiService, private traverson:any) {

  }

  public getPersonByUserName(userName:string):IPromise<any> {
    return this.traverson.hal()
      .from(this.gate.getPersonsApi())
      .jsonHal()
      .withTemplateParameters({user: userName})
      .follow('persons')
      .getResource()
      .result
  }

  public getAllPersons():IPromise<any> {
    return this.traverson.hal()
      .from(this.gate.getPersonsApi())
      .jsonHal()
      .follow('persons')
      .getResource()
      .result
  }
}
