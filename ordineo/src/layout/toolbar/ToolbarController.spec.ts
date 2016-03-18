import {ToolbarController} from "./ToolbarController";
describe("ToolbarController", ()=> {
  var ctrl:ToolbarController;

  beforeEach(()=> {
    ctrl = new ToolbarController();
  });

  it("should get 6 buttons", ()=> {
    expect(ctrl.buttons.length).toBe(6);
  });
});
