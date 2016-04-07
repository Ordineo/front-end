var JsonHalAdapter = require('traverson-hal');

export class TraversonHalService {
  static SERVICE_NAME = "TraversonHalService";

  static $inject:Array<string> = ['traverson'];

  constructor(private travs:any) {
  }

  public hal():any {
    this.travs.registerMediaType(
      JsonHalAdapter.mediaType,
      JsonHalAdapter
    );

    return this.travs;
  }
}
