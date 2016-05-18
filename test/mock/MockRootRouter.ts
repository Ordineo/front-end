import Router = angular.Router;
export class MockRootRouter implements Router {

  navigating:boolean;
  lastNavigationAttempt:string;
  registry:angular.RouteRegistry;
  parent:angular.Router;
  hostComponent:any;

  childRouter(hostComponent:any):angular.Router {
    return null;
  }

  auxRouter(hostComponent:any):angular.Router {
    return null;
  }

  registerPrimaryOutlet(outlet:angular.RouterOutlet):angular.IPromise<boolean> {
    return null;
  }

  registerAuxOutlet(outlet:angular.RouterOutlet):angular.IPromise<boolean> {
    return null;
  }

  isRouteActive(instruction:angular.Instruction):boolean {
    return null;
  }

  config(definitions:angular.RouteDefinition[]):angular.IPromise<any> {
    return null;
  }

  navigate(linkParams:any[]):angular.IPromise<any> {
    return null;
  }

  navigateByUrl(url:string, _skipLocationChange?:boolean):angular.IPromise<any> {
    return null;
  }

  navigateByInstruction(instruction:angular.Instruction, _skipLocationChange?:boolean):angular.IPromise<any> {
    return null;
  }

  commit(instruction:angular.Instruction, _skipLocationChange?:boolean):angular.IPromise<any> {
    return null;
  }

  subscribe(onNext:(value:any)=>void):Object {
    return null;
  }

  deactivate(instruction:angular.Instruction):angular.IPromise<any> {
    return null;
  }

  recognize(url:string):angular.IPromise<angular.Instruction> {
    return null;
  }

  renavigate():angular.IPromise<any> {
    return null;
  }

  generate(linkParams:any[]):angular.Instruction {
    return null;
  }
}
