"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WarningPage = void 0;
const protractor_1 = require("protractor");
const Common_1 = require("../Common");
const Page_1 = require("./Page");
class WarningPage {
    constructor() {
        this.root = Common_1.Common.ElementByDataComponent(`WarningTemplate`);
        this.warningText = protractor_1.element(protractor_1.by.css(`p[class*="messageText"]`));
        this.continueButton = protractor_1.element(protractor_1.by.xpath(`//*/button/span[contains(text(),'Продолжить')]`));
        console.log(`Warning Page constructor`);
        Page_1.Page.Wait.ElementPresent(this.root, `Warning template page`);
    }
    CheckWarningText(text) {
        console.log(`Check Warning text is ${text}`);
        expect(this.warningText.getText()).toEqual(text);
    }
    ClickContinueButton() {
        console.log(`Click continue button`);
        this.continueButton.click();
        Page_1.Page.Wait.ElementNotPresent(this.root, `'Warning template page'`);
    }
}
exports.WarningPage = WarningPage;
