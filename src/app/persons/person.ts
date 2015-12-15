module oraj360 {


    export class Address {

        street:string;
        streetNumber:number;
        bus:string;
        zipCode:string;
        city:string;
        province:string;
        country:string;
    }

    export class Role {
        name:string;
        isFunctional:boolean;
    }

    export class Customer {
        name:string;
    }
}