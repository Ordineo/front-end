import IComponentOptions = angular.IComponentOptions;
export class ProfileComponent implements IComponentOptions {
  static NAME:string = "profile";

  template:string = `
    <!--<linkedin></linkedin>-->
    <app-header title="hello world"></app-header>
    <profile-about></profile-about>
    <milestone-container id="milestone-container"></milestone-container>
  `
}
