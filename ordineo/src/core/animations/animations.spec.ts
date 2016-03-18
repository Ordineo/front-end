import {transitionHeight} from "./animations";
import {fadeInOnNgShow} from "./animations";
import {editIcons} from "./animations";
import {simpleFade} from "./animations";
describe("Animation tests", ()=> {

  it("transition height should be defined", ()=> {
    expect(transitionHeight()).toBeDefined();
    expect(transitionHeight())
  });
  it("fadeInOnNgShow should be defined", ()=> {
    expect(fadeInOnNgShow).toBeDefined();
  });
  it("editIcons should be defined", ()=> {
    expect(editIcons).toBeDefined();
  });
  it("simpleFade should be defined", ()=> {
    expect(simpleFade).toBeDefined();
  });
});
