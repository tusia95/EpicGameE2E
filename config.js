"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    framework: 'jasmine',
    //seleniumAddress: "http://127.0.0.1:4444/wd/hub",
    //SELENIUM_PROMISE_MANAGER: false,
    capabilities: {
        browserName: "chrome",
        chromeOptions: {
            args: ["--no-sandbox --incognito --start-maximized"]
        }
    },
    jasmineNodeOpts: {
        showColors: true,
        // default time to wait in ms before a test fails.
        defaultTimeoutInterval: 500000,
    },
    specs: [
        "Tests/*Test.js",
    ],
    onPrepare: function () {
        var originalAddExpectationResult = jasmine.Spec.prototype.addExpectationResult;
        jasmine.Spec.prototype.addExpectationResult = function () {
            var self = this;
            if (!arguments[0]) {
                console.log('Expect failure!');
            }
            return originalAddExpectationResult.apply(this, arguments);
        };
    }
};
