import {GatewayApiService} from "../../gateway/service/GatewayApiService";

var traverson = require('traverson');
var hal = require('traverson-hal');

export class ObjectivesService {

  static NAME = 'jworks360.objectives.service';

  static $inject = [GatewayApiService.SERVICE_NAME];

  constructor(private gateway:GatewayApiService) {
  }

  public getObjectives():void {
    hal.registerMediaType(
      hal.getMediaType(),
      hal.getTraversonHal());

    hal
      .from(this.gateway.getObjectivesApi())
      .jsonHal()
      .follow('objectives', 'objectives[$all]')
      .getResource()
      .result
      .then(function (document) {
        console.log('We have followed the path and reached our destination.');
        console.log(document);
      }, function (err) {
        console.error(err);
      });
  }

}
