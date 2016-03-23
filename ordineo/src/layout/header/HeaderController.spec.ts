import {HeaderController} from "./HeaderController";
describe("Header controller", ()=> {
  var ctrl:HeaderController;

  beforeEach(()=> {
    ctrl = new HeaderController();
  });

  it("should be defined", ()=> {
    expect(ctrl).toBeDefined();
  });
});
