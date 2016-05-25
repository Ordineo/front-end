import {Observable} from "rxjs/Observable";
import IScope = angular.IScope;
import {Observer} from "rxjs/Rx";
export class ScopeObserver {

  static NAME: string = "observeOnScope";

  public watch(scope: IScope, expr: string): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      scope.$watch(expr, (newValue: any, oldValue: any) => {
        observer.next(newValue);
      });
    });
  }
}
