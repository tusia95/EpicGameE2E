"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Page = void 0;
const protractor_1 = require("protractor");
var Page;
(function (Page) {
    let Config;
    (function (Config) {
        let Urls;
        (function (Urls) {
            Urls.store = "https://www.epicgames.com/store/ru/";
        })(Urls = Config.Urls || (Config.Urls = {}));
    })(Config = Page.Config || (Page.Config = {}));
    let Navigate;
    (function (Navigate) {
        function ByUrl(url, ignoreSynchronization = true) {
            console.log("Prepare Browser by url: " + url);
            protractor_1.browser.ignoreSynchronization = ignoreSynchronization;
            protractor_1.browser.driver.get(url).catch(function (err) {
                console.log('browser get on catch "' + err + '"');
            });
            return protractor_1.browser.wait(function () {
                return protractor_1.browser.getCurrentUrl().then(function (currentUrl) {
                    return currentUrl.trim().replace(/\/$/, "") === url.trim().replace(/\/$/, "");
                });
            }, 30000, "url isn`t loaded");
        }
        Navigate.ByUrl = ByUrl;
        function Store() {
            ByUrl(Page.Config.Urls.store);
        }
        Navigate.Store = Store;
    })(Navigate = Page.Navigate || (Page.Navigate = {}));
    let Wait;
    (function (Wait) {
        function Url(url, timeout = 30000, message = "url has not changed") {
            console.log('Wait for url "' + url + '"');
            return protractor_1.browser.wait(function () {
                return protractor_1.browser.getCurrentUrl().then(function (currentUrl) {
                    return currentUrl.trim().replace(/\/$/, "") === url.trim().replace(/\/$/, "");
                });
            }, timeout, message);
        }
        Wait.Url = Url;
        function ElementDisplayed(target, elementName, timeout = 30000) {
            return protractor_1.browser.driver.wait(() => { return target.isDisplayed(); }, timeout, elementName + " not displayed");
        }
        Wait.ElementDisplayed = ElementDisplayed;
        function ElementsDisplayed(target, elementsName, timeout = 30000) {
            target.count().then((value) => {
                for (let i = 0; i < value; i++) {
                    return protractor_1.browser.driver.wait(() => { return target.get(i).isDisplayed(); }, timeout, `${elementsName} with number ${i + 1} not displayed`);
                }
            });
        }
        Wait.ElementsDisplayed = ElementsDisplayed;
        function ElementPresent(target, elementName, timeout = 30000) {
            return protractor_1.browser.driver.wait(() => { return target.isPresent(); }, timeout, elementName + " is not present");
        }
        Wait.ElementPresent = ElementPresent;
        function ElementNotPresent(target, elementName, timeout = 30000) {
            return protractor_1.browser.driver.wait(() => { return target.isPresent().then((r) => { return !r; }); }, timeout, elementName + " is present");
        }
        Wait.ElementNotPresent = ElementNotPresent;
        function ElementNotDisplayed(target, elementName, timeout = 30000) {
            return protractor_1.browser.driver.wait(() => { return target.isDisplayed().then((r) => { return !r; }); }, timeout, elementName + " is displayed");
        }
        Wait.ElementNotDisplayed = ElementNotDisplayed;
    })(Wait = Page.Wait || (Page.Wait = {}));
})(Page = exports.Page || (exports.Page = {}));
