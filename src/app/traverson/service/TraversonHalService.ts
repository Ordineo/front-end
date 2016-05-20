var jsonHalAdapter = require("traverson-hal");

export class TraversonHalService {
  static SERVICE_NAME: string = "TraversonHalService";

  static $inject: Array<string> = ["traverson"];

  constructor(private travs: any) {
  }

  public hal(): any {
    this.travs.registerMediaType(
      jsonHalAdapter.mediaType,
      jsonHalAdapter
    );

    return this.travs;
  }
}
