import IDirective = angular.IDirective;
import IDirectiveLinkFn = angular.IDirectiveLinkFn;
import IScope = angular.IScope;
import IAugmentedJQuery = angular.IAugmentedJQuery;
import IAttributes = angular.IAttributes;

/**
 * @ngdoc directive
 * @name hasLoadingStatus
 * @module ordineo.core
 *
 * @restrict A
 *
 * @usage
 * <div has-loading-status></div>
 *
 */
export class LoadingStatusDirective implements IDirective {

  static NAME:string = 'hasLoadingStatus';

  restrict:string = 'A';
  link:IDirectiveLinkFn = (scope:IScope, element:IAugmentedJQuery, attrs:IAttributes, ctrl:any) => {
    console.log(element[0].localName);
  };

  static instance():IDirective{
    return new LoadingStatusDirective();
  }
}
