// this file is only being used by karma
require('phantomjs-polyfill');

requireAll((<any>require).context("../src/app/", true, /spec.ts$/));

function requireAll(r: any): any {
  r.keys().forEach(r);
}
