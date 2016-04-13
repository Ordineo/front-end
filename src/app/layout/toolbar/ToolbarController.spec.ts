import {ToolbarController} from "./ToolbarController";
describe("ToolbarController", ()=> {
  var ctrl:ToolbarController;

  beforeEach(inject((_$rootScope_)=> {
    ctrl = new ToolbarController(_$rootScope_);
  }));

  it("should get 6 buttons", ()=> {
    expect(ctrl.buttons.length).toBe(6);
  });
});