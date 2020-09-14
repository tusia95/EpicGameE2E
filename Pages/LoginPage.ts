import protractor = require('protractor');
import {by, element, browser} from "protractor";
import { Common } from "../Common";
import { Page } from "./Page";
export class LoginPage {

    constructor() {
        console.log(`Login page constructor`);
        Page.Wait.ElementPresent(this.root, `login page`);
    }

    public CheckLoginAppleBlockIsDisplayed(loginText: string) {
        Page.Wait.ElementDisplayed(this.appleLoginBlock, `apple login element`);
        expect(<any>this.appleLoginBlock.getText()).toEqual(loginText);

    }

    

    private root: protractor.ElementFinder = element(by.css(`div[class*="ModalBase-container"]`));
    private appleLoginBlock: protractor.ElementFinder = element(by.css(`div[id*="login-with-apple"]`));
}