"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Common = void 0;
const protractor_1 = require("protractor");
var Common;
(function (Common) {
    function ComponentNameCss(componentValue) {
        return "[data-component='{value}']".replace('{value}', componentValue);
    }
    Common.ComponentNameCss = ComponentNameCss;
    function TestIdCss(idValue) {
        return "[data-testid='{value}']".replace('{value}', idValue);
    }
    Common.TestIdCss = TestIdCss;
    function ElementByDataComponent(componentValue) {
        return protractor_1.element(protractor_1.by.css(ComponentNameCss(componentValue)));
    }
    Common.ElementByDataComponent = ElementByDataComponent;
    function ElementByTestId(idValue) {
        return protractor_1.element(protractor_1.by.css(TestIdCss(idValue)));
    }
    Common.ElementByTestId = ElementByTestId;
    function ElementsAllByTestId(idValue) {
        return protractor_1.element.all(protractor_1.by.css(TestIdCss(idValue)));
    }
    Common.ElementsAllByTestId = ElementsAllByTestId;
    function ElementsAllByComponentName(componentValue) {
        return protractor_1.element.all(protractor_1.by.css(ComponentNameCss(componentValue)));
    }
    Common.ElementsAllByComponentName = ElementsAllByComponentName;
    function ScrollIntoView(target) {
        protractor_1.browser.wait(target.isDisplayed().then(function (result) {
            if (!result) {
                protractor_1.browser.executeScript("arguments[0].scrollIntoView();", target.getWebElement());
                console.log('Scroll to element');
            }
            return true;
        }));
    }
    Common.ScrollIntoView = ScrollIntoView;
})(Common = exports.Common || (exports.Common = {}));
