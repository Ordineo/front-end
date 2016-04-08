export class DateUtil {
  static getTimeLineStartDate():string {
    return new Date().getFullYear().toString() + '-01-01';
  }

  static getTimeLineEndDate():string {
    return new Date().getFullYear().toString() + '-12-31';
  }
}

