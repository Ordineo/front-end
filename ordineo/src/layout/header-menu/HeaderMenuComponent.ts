import IComponentOptions = angular.IComponentOptions;

require('./header-menu-styles.scss');

/**
 * @usage
 *
 *     <header-menu menu-items="{{items}}">
 *
 *     </header-menu>
 */
export class HeaderMenuComponent implements IComponentOptions{

  static NAME:string = 'headerMenu';

  bindings:any = {
    menuItems: '<'
  };

  controller:Function = HeaderMenuComponentController;
  controllerAs:string = '$vm';
  template:string = require('./header-menu-template.html');
}

export interface IHeaderMenuScope{
  menuItems:Array<string>;
}

export class HeaderMenuComponentController implements IHeaderMenuScope{
  public menuItems:Array<string> = [];
}
