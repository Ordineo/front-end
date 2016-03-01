export class Person{
  private _email:string;

  setEmail(email:string):void{
    this._email = email;
  }

  getEmail():string{
    return this._email;
  }
}
