// this file is only being used by karma
require('phantomjs-polyfill');

requireAll(require.context("./", true, /spec.ts$/));
function requireAll(r) {
    r.keys().forEach(r);
}
//# sourceMappingURL=test.js.map
