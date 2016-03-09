import 'angular';
import {GatewayApiService} from "../../gateway/service/GatewayApiService";
import {Person} from "../model/person";
import IPromise = angular.IPromise;
import {TraversonHalService} from "../../traverson/service/TraversonHalService";

export const PERSONS_SERVICE = "jworks360.persons.service";

export interface IPersonsDataService {
  getAllPersons():IPromise<any>;
}

export class PersonsService implements IPersonsDataService {

  static $inject:Array<string> = [
    GatewayApiService.SERVICE_NAME,
    TraversonHalService.SERVICE_NAME
  ];

  constructor(private gate:GatewayApiService, private traverson:any) {

  }

  public getAllPersons():IPromise<any> {
    //this.traverson.hal()
    //  .from(this.gate.getPersonsApi())
    //  .jsonHal()
    //  .follow('persons')
    //  .getResource()
    //  .result
    //  .then(function (document) {
    //    console.log('We have followed the path and reached our destination.');
    //    console.log(JSON.stringify(document))
    //  }, function (err) {
    //    console.error('No luck');
    //  });

    return null;
  }

}
