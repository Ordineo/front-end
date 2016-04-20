import 'angular';
import 'angular-material';
//"typescript import uses absolute path so I prefer using commonjs" - Ryan
//import '../../../node_modules/angular-material/angular-material.css';
require('angular-material/angular-material.css');
require('./custom-material-styles.scss');
import '../../assets/styles/main.scss';
import '../../assets/fonts/fonts.scss';
import 'angular-aria';
import 'angular-animate';
import IIconProvider = angular.material.IIconProvider;
import IThemingProvider = angular.material.IThemingProvider;
import IDateLocaleProvider = angular.material.IDateLocaleProvider;

export const MATERIAL_DESIGN = "material.design";

angular
  .module(MATERIAL_DESIGN, ['ngMaterial', 'angularMoment'])
  .config(mdConfig);

mdConfig.$inject = ['$mdIconProvider', '$mdThemingProvider', '$mdDateLocaleProvider', 'moment'];

function mdConfig($mdIcon:IIconProvider,
                  $mdThemingProvider:IThemingProvider,
                  $mdDateLocaleProvider:IDateLocaleProvider,
                  moment:any) {
  var customPrimary = {
    '50': '#747e99',
    '100': '#67718d',
    '200': '#5c667e',
    '300': '#525a6f',
    '400': '#474e61',
    '500': '#3C4252',
    '600': '#313643',
    '700': '#262a35',
    '800': '#1c1e26',
    '900': '#111317',
    'A100': '#838ca4',
    'A200': '#929aaf',
    'A400': '#a0a7ba',
    'A700': '#060708'
  };
  $mdThemingProvider
    .definePalette('customPrimary',
      customPrimary);

  var customAccent = {
    '50': '#fbbf73',
    '100': '#fab35a',
    '200': '#f9a841',
    '300': '#f89d28',
    '400': '#f89110',
    '500': '#E78407',
    '600': '#ce7606',
    '700': '#b56806',
    '800': '#9d5a05',
    '900': '#844b04',
    'A100': '#fbca8b',
    'A200': '#fcd5a4',
    'A400': '#fde1bd',
    'A700': '#6b3d03'
  };
  $mdThemingProvider
    .definePalette('customAccent',
      customAccent);

  var customWarn = {
    '50': '#9acffa',
    '100': '#82c4f8',
    '200': '#6ab8f7',
    '300': '#51adf6',
    '400': '#39a1f4',
    '500': '#2196F3',
    '600': '#0d8aee',
    '700': '#0c7cd5',
    '800': '#0a6ebd',
    '900': '#0960a5',
    'A100': '#b2dbfb',
    'A200': '#cae6fc',
    'A400': '#e3f2fd',
    'A700': '#08528d'
  };
  $mdThemingProvider
    .definePalette('customWarn',
      customWarn);

  $mdThemingProvider.theme('default')
    .primaryPalette('customAccent')
    .warnPalette('customWarn')
    .accentPalette('customPrimary');

  $mdIcon
    .iconSet('social',require('./icon-packs/social-icons.svg'), 24)
    .iconSet('nav',require('./icon-packs/navigation-icons.svg'), 24)
    .iconSet('content',require('./icon-packs/content-icons.svg'), 24)
    .iconSet('act', require('./icon-packs/action-icons.svg'), 24)
    .iconSet('com', require('./icon-packs/communication-icons.svg'), 24)
    .iconSet('mdi', require('./icon-packs/mdi-icons.svg'), 24);

  $mdDateLocaleProvider.formatDate = function(date) {
    return moment(date).format('DD-MM-YYYY');
  };

  $mdDateLocaleProvider.parseDate = function(dateString) {
    var m = moment(dateString, 'DD-MM-YYYY', true);
    return m.isValid() ? m.toDate() : new Date(NaN);
  };
}
