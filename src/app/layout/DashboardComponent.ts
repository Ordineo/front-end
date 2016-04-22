import IComponentOptions = angular.IComponentOptions;
export class DashboardComponent implements IComponentOptions {
  static NAME:string = 'dashboard';

  template:string = `
  <div id="page-wrap">
    <toolbar></toolbar>
    <header></header>
    <profile-about username="{{profile.username}}"></profile-about>
    <milestone-container id="milestone-container" username="{{profile.username}}"></milestone-container>
  </div>
  `;
}
