import 'angular';
import {PersonsService} from "./service/PersonService.ts";
import {PERSONS_SERVICE} from "./service/PersonService.ts";

export const MODULE_PERSONS = 'jworks360.persons';

var deps:Array<string> = [];

angular
  .module(MODULE_PERSONS, deps)
  .service(PERSONS_SERVICE, PersonsService);

