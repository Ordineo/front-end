import IRootScopeService = angular.IRootScopeService;
import IScope = angular.IScope;
export class ProfileMenuState {
  static NAME: string = "profileMenuState";
  static EVENT_TAB_SELECTED: string = "tabSelectedEvent";

  static $inject: string[] = ["$rootScope"];

  constructor(private rootScope: IRootScopeService) {
  }

  public subscribe(scope: IScope, callBack: any): void {
    var handler: any = this.rootScope.$on(ProfileMenuState.EVENT_TAB_SELECTED, callBack);
    scope.$on("$destroy", handler);
  }

  public notifyTabSelected(tabName: string): void {
    this.rootScope.$emit(ProfileMenuState.EVENT_TAB_SELECTED, {tabName: tabName});
  }
}
