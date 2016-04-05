import IDirective = angular.IDirective;
import IParseService = angular.IParseService;
import IScope = angular.IScope;
import IAugmentedJQuery = angular.IAugmentedJQuery;
import IAttributes = angular.IAttributes;
export class FileUploadDirective implements IDirective {
  static NAME:string = "fileModel";
  static $inject:Array<string> = ['$parse'];

  constructor(private parseService:IParseService) {
  }

  restrict:string = 'A';
  link:angular.IDirectiveLinkFn = (scope:IScope, element:any, attrs:any)=>{
    var model = this.parseService(attrs.fileModel);
    var modelSetter = model.assign;

    element.bind('change', function(){
      scope.$apply(function(){
        modelSetter(scope, element[0].files[0]);
      });
    });
  };

  static instance():any{
    const directive = ($parse:IParseService)=>new FileUploadDirective($parse);
    directive.$inject = ['$parse'];
    return directive;
  }
}
