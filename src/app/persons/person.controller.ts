/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/restangular/restangular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />
/// <reference path="../services/person.service.ts"/>
module oraj360 {

    export class Person {
        firstName:string;
        lastName:string;
        username:string;
        gender:string;
        contactInformation:string;
        enrolmentDate:Date;
        active:boolean;
        photo:string;
        unit:string;
        birthDate:Date;
        address:any;
        businessUnitManagers:any[];
        practiceManagers:any[];
        coaches:any[];
        competenceLeaders:any[];
        users = [];
        roles:any;
        customers:any;
        _links:any;
    }

    export class updatedPerson {
        firstName:string;
        lastName:string;
        contactInformation:string;
    }


    export class PersonController {


        private personService:IPersonService;
        username:string = window.sessionStorage.getItem("username");
        myDetails:Person;
        updatedPerson:updatedPerson;
        example = 'http://thesocialmediamonthly.com/wp-content/uploads/2015/08/photo.png';
        persons=[];
        selections =[
        {name: "Users"},
        {name:"BusinessUnitManagers"},
            {name:"CompetenceLeaders"},
            {name:"PracticeManagers"},
            {name:"Coaches"}];

        toggleRight = this.buildToggler('right');
        isOpenRight = function () {
            return this.$mdSidenav('right').isOpen();
        };
        static $inject = ["PersonService", "$location", "$scope", "$timeout", "$mdSidenav"];

        constructor(personService:IPersonService, private $location:ng.ILocationService, private $scope, private $timeout:ng.ITimeoutService, private $mdSidenav) {
            this.personService = personService;
            var that = this;
            $timeout(function () {

                that.myDetails = that.personService.getPerson();


            }, 500);

        }

        changeView(selected):void{
            var thos = this;
           var list= eval("this.myDetails._links."+selected);
            thos.persons=[];
            if(list!==undefined){
                if(list.href===undefined){
                    list.forEach((function(data){
                        thos.personService.getPersonByLink(data.href).then(function(person){
                            thos.persons.push(person)
                        })}));
                }else{
                    thos.personService.getPersonByLink(list.href).then(function(data){
                        thos.persons.push(data);
                    });

                }
            }
            }

        updatePerson():void {
            if (this.updatedPerson.firstName.length > 0) {
                this.myDetails.firstName = this.updatedPerson.firstName;

            }
            if (this.updatedPerson.lastName.length > 0) {
                this.myDetails.lastName = this.updatedPerson.lastName;

            }
            if (this.updatedPerson.contactInformation.length > 0) {
                this.myDetails.contactInformation = this.updatedPerson.contactInformation;
            }

            this.personService.updatePerson(this.myDetails).then(function (data) {
                console.log("success!")
            });
        }

        buildToggler(navID:string) {
            return function () {
                this.$mdSidenav(navID)
                    .toggle()
                    .then(function () {
                    });
            }
        }

    }
    angular.module("oraj360")
        .controller("PersonController", PersonController);


}