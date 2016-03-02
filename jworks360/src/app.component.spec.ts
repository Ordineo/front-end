import 'phantomjs-polyfill';
import {APP_NAME} from "./app.module";

describe("Main App Component", () => {
  it("app name should be jworks360", () => {
    expect(APP_NAME).toBe("jworks360");
  });
});
