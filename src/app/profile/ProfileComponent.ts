import IComponentOptions = angular.IComponentOptions;
export class ProfileComponent implements IComponentOptions{
  static NAME:string = "profile";

  template:string = `
    <profile-about></profile-about>
  `
}
