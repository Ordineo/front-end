import 'angular';
import 'angular-material';
//"typescript import uses absolute path so I prefer using commonjs" - Ryan
//import '../../../node_modules/angular-material/angular-material.css';
require('angular-material/angular-material.css');
import 'angular-aria';
import 'angular-animate';
import IIconProvider = angular.material.IIconProvider;
import IThemingProvider = angular.material.IThemingProvider;

export const MATERIAL_DESIGN = "material.design";

angular
  .module(MATERIAL_DESIGN, ['ngMaterial'])
  .config(mdConfig);

mdConfig.$inject = ['$mdIconProvider', '$mdThemingProvider'];

function mdConfig($mdIcon:IIconProvider, $mdTheme:IThemingProvider) {
  $mdTheme
    .theme('default')
    .primaryPalette('orange');

  $mdIcon.iconSet('com', require('./icon-packs/communication-icons.svg'), 24);
}
