import 'angular';
import {PersonsDataService} from "./persons.dataservice";
import {PERSONS_DATA_SERVICE} from "./persons.dataservice";

export const MODULE_PERSONS = 'jworks360.persons';

var deps:Array<string> = [];

var modulePersons:ng.IModule = ng.module(MODULE_PERSONS, deps);

modulePersons.factory(PERSONS_DATA_SERVICE, PersonsDataService);

