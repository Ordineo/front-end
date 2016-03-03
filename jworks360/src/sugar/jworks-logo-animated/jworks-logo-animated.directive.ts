import IDirective = angular.IDirective;
import IDirectiveLinkFn = angular.IDirectiveLinkFn;
import IScope = angular.IScope;
import IAttributes = angular.IAttributes;
import IAugmentedJQuery = angular.IAugmentedJQuery;
export class JworksLogoAnimated implements IDirective {
  static NAME = 'jworksLogoAnimated';

  restrict:string = 'E';
  link:IDirectiveLinkFn = JworksLogoAnimated.linkFunc;

  static linkFunc(
    scope: IScope,
    instanceElement: IAugmentedJQuery,
    instanceAttributes: IAttributes
  ):void{

  }
}
