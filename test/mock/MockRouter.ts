import Router = angular.Router;
export class MockRouter implements Router {

  navigating:boolean;
  lastNavigationAttempt:string;
  registry:angular.RouteRegistry;
  parent:angular.Router;
  hostComponent:any;

  childRouter(hostComponent:any):angular.Router {
    return undefined;
  }

  auxRouter(hostComponent:any):angular.Router {
    return undefined;
  }

  registerPrimaryOutlet(outlet:angular.RouterOutlet):angular.IPromise<boolean> {
    return undefined;
  }

  registerAuxOutlet(outlet:angular.RouterOutlet):angular.IPromise<boolean> {
    return undefined;
  }

  isRouteActive(instruction:angular.Instruction):boolean {
    return undefined;
  }

  config(definitions:angular.RouteDefinition[]):angular.IPromise<any> {
    return undefined;
  }

  navigate(linkParams:any[]):angular.IPromise<any> {
    return undefined;
  }

  navigateByUrl(url:string, _skipLocationChange?:boolean):angular.IPromise<any> {
    return undefined;
  }

  navigateByInstruction(instruction:angular.Instruction, _skipLocationChange?:boolean):angular.IPromise<any> {
    return undefined;
  }

  commit(instruction:angular.Instruction, _skipLocationChange?:boolean):angular.IPromise<any> {
    return undefined;
  }

  subscribe(onNext:(value:any)=>void):Object {
    return undefined;
  }

  deactivate(instruction:angular.Instruction):angular.IPromise<any> {
    return undefined;
  }

  recognize(url:string):angular.IPromise<angular.Instruction> {
    return undefined;
  }

  renavigate():angular.IPromise<any> {
    return undefined;
  }

  generate(linkParams:any[]):angular.Instruction {
    return undefined;
  }

}
