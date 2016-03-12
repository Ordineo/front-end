
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

  public barResponsiveOptions:any = [
  ['screen and (min-width: 641px) and (max-width: 1024px)', {
    seriesBarDistance: 10,
    high: 100,
    low:0,
    axisX: {
      showLabel:false,
      showGrid:false,
    },
    axisY: {
      showLabel:false,
      showGrid:false,
    }
  }],
  ['screen and (max-width: 640px)', {
    seriesBarDistance: 5,
    axisX: {
      labelInterpolationFnc: function(value) {
        return value[0];
      }
    }
  }]
];

  public barOptions:any = {
    seriesBarDistance: 15,
    horizontalBars:true,
    axisY:{
      offset:70
    }
  };

  constructor() {

  }
}
