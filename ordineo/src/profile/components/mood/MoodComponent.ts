
export class MoodComponent {
  static NAME:string = "mood";

  bindings:any = {
    barData: '=?'
  };
  controller:Function = MoodComponentController;
  controllerAs:string = '$ctrl';
  template:string = require('./mood-template.html');
}

export class MoodComponentController {
  public barData:any = {
    labels: ['Mood', 'Tue', 'Wed', 'Thu', 'Fri'],
    // Our series array that contains series objects or in this case series data arrays
    series: [
      [65]
    ],
  };

  public barOptions:any = {
    seriesBarDistance: 10,
    horizontalBars:true,
    high: 100,
    low: 0,
    axisX: {
      showLabel: false,
      showGrid: false,
    },
    axisY: {
      showLabel: false,
      showGrid: false,
    }
  };

  constructor() {

  }
}
