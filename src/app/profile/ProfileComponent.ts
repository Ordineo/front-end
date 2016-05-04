import IComponentOptions = angular.IComponentOptions;
export class ProfileComponent implements IComponentOptions {
  static NAME:string = "profile";

  template:string = `
    <linkedin></linkedin>
    <profile-about></profile-about>
    <milestone-container></milestone-container>
  `
}
