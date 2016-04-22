import {ToolbarController} from "./ToolbarController";
describe("ToolbarController", ()=> {
  var ctrl:ToolbarController;

  beforeEach(inject((_$rootScope_)=> {
    ctrl = new ToolbarController(_$rootScope_);
  }));

  it("should get 3 buttons", ()=> {
    expect(ctrl.buttons.length).toBe(3);
  });
});
