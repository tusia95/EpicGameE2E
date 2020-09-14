import protractor = require('protractor');
import {by, element, browser} from "protractor";
import { Common } from "../Common";
import { Page } from "./Page";


export class WarningPage {

    constructor() {
        console.log(`Warning Page constructor`);
        Page.Wait.ElementPresent(this.root, `Warning template page`);
    }

    public CheckWarningText(text: string) {
        console.log(`Check Warning text is ${text}`);
        expect(<any>this.warningText.getText()).toEqual(text);
    }

    public ClickContinueButton() {
        console.log(`Click continue button`);
        this.continueButton.click();
        Page.Wait.ElementNotPresent(this.root, `'Warning template page'`)
    }

    private root: protractor.ElementFinder = Common.ElementByDataComponent(`WarningTemplate`);
    private warningText: protractor.ElementFinder = element(by.css(`p[class*="messageText"]`));
    private continueButton: protractor.ElementFinder = element(by.xpath(`//*/button/span[contains(text(),'Продолжить')]`));
}