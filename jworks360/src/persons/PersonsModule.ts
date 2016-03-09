import 'angular';
import {PersonsService} from "./service/PersonService.ts";
import {PERSONS_SERVICE} from "./service/PersonService.ts";
import {TRAVERSON} from "../traverson/TraversonModule";

export const JWORKS360_PERSONS = 'jworks360.persons';

var deps:Array<string> = [
  TRAVERSON
];

angular
  .module(JWORKS360_PERSONS, deps)
  .service(PERSONS_SERVICE, PersonsService);

