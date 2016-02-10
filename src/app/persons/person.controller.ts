/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/restangular/restangular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />
/// <reference path="../../../typings/angular-material/angular-material.d.ts" />
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

        persons=[];
        experiences = [
        {
            "startDate": "2015-08-01",
            "endDate": null,
            "project": "CRS medewerker",
            "function": ".NET Software Engineer",
            "customer": {
                "name": "Digipolis",
                "img": "http://www.internetarchitects.be/wp-content/uploads/2014/10/digipolis.png"
            }
        },
        {
            "startDate": "2014-11-01",
            "endDate": "2015-08-01",
            "project": "Digitale handtekencomponent",
            "function": ".NET Software Engineer",
            "customer": {
                "name": "Digipolis",
                "img": "http://www.internetarchitects.be/wp-content/uploads/2014/10/digipolis.png"
            }
        },
        {
            "startDate": "2014-02-01",
            "endDate": "2014-11-01",
            "project": "Handtekenmap",
            "function": ".NET Software Engineer",
            "customer": {
                "name": "Digipolis",
                "img": "http://www.internetarchitects.be/wp-content/uploads/2014/10/digipolis.png"
            }
        },
        {
            "startDate": "2013-05-01",
            "endDate": "2014-02-01",
            "project": "Markten en foren",
            "function": ".NET Software Engineer",
            "customer": {
                "name": "Digipolis",
                "img": "http://www.internetarchitects.be/wp-content/uploads/2014/10/digipolis.png"
            }
        },
        {
            "startDate": "2012-08-01",
            "endDate": "2013-05-01",
            "project": "Brondata groen",
            "function": ".NET Software Engineer",
            "customer": {
                "name": "Digipolis",
                "img": "http://www.internetarchitects.be/wp-content/uploads/2014/10/digipolis.png"
            }
        }
    ];
        selections =[
        {name: "Users"},
        {name:"BusinessUnitManagers"},
            {name:"CompetenceLeaders"},
            {name:"PracticeManagers"},
            {name:"Coaches"}];


        static $inject = ["PersonService", "$timeout", "$mdSidenav"];

        constructor(private personService:IPersonService, private $timeout:ng.ITimeoutService, public $mdSidenav,public myDetails:Person,public updatedPerson:updatedPerson,public username:string,public toggleRight) {
            console.log('PersonController');
            var that = this;

            this.username = window.sessionStorage.getItem("username");
            this.toggleRight = this.buildToggler('right');

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