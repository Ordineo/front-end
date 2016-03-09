import 'angular';
import {GatewayApiService} from "../../gateway/service/GatewayApiService";
import {Person} from "../model/person";

export const PERSONS_SERVICE = "jworks360.persons.service";


export interface IPersonsDataService{
  getAllPersons():Array<Person>;
}

export class PersonsService implements IPersonsDataService{

  static $inject:Array<string> = [GatewayApiService.SERVICE_NAME];

  constructor() {

  }

  public getAllPersons():Array<Person> {

    return null;
  }

}
