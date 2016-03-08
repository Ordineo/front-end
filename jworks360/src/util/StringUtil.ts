export class StringUtil {

  static createShortVersion(txt:string):string {
    var SHORTENER_MAX_INDEX:number = 8;

    return txt.substring(0, SHORTENER_MAX_INDEX).concat('...');
  }
}
