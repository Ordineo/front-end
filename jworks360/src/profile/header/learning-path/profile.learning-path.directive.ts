import IComponentOptions = angular.IComponentOptions;
import IDirective = angular.IDirective;
import IAttributes = angular.IAttributes;
import IAugmentedJQuery = angular.IAugmentedJQuery;
import IScope = angular.IScope;
import IDirectiveLinkFn = angular.IDirectiveLinkFn;
require('vis/dist/vis.css');
require('./style.scss');
var vis = require('vis/dist/vis.js');

export class LearningPathDirective implements IDirective{
  static NAME = 'learningPath';

  restrict:string = 'A';
  bindToController:any = {};
  scope:any = {};
  link:IDirectiveLinkFn = LearningPathDirective.linkFunc;
  controller:Function = LearningPathController;
  controllerAs:string = 'vm';
  template:string = require('./profile.learning-path.html');

  static linkFunc(
    scope:IScope,
    instanceElement:IAugmentedJQuery,
    instanceAttributes:IAttributes
  ){
    // Create a DataSet (allows two way data-binding)
    var items = new vis.DataSet([
      {id: 1, content: 'item 1', start: '2016-01-20'},
      {id: 2, content: 'item 2', start: '2016-04-14'},
      {id: 3, content: 'item 3', start: '2016-06-18'},
      {id: 5, content: 'item 5', start: '2016-11-25'},
    ]);

    // Configuration for the Timeline
    var options = {
      start:'2016-01-01',
      end: '2016-12-31',
    };

    new vis.Timeline(instanceElement[0], items, options);
  }

  static instance() {
    return new LearningPathDirective();
  }
}

class LearningPathController{

  constructor(){}
}
