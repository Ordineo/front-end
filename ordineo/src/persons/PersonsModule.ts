import 'angular';
import {PersonsService} from "./service/PersonService.ts";
import {PERSONS_SERVICE} from "./service/PersonService.ts";
import {TRAVERSON} from "../traverson/TraversonModule";

export const ORDINEO_PERSONS = 'ordineo.persons';

var deps:Array<string> = [
  TRAVERSON
];

angular
  .module(ORDINEO_PERSONS, deps)
  .service(PERSONS_SERVICE, PersonsService);

