"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginPage = void 0;
const protractor_1 = require("protractor");
const Page_1 = require("./Page");
class LoginPage {
    constructor() {
        this.root = protractor_1.element(protractor_1.by.css(`div[class*="ModalBase-container"]`));
        this.appleLoginBlock = protractor_1.element(protractor_1.by.css(`div[id*="login-with-apple"]`));
        console.log(`Login page constructor`);
        Page_1.Page.Wait.ElementPresent(this.root, `login page`);
    }
    CheckLoginAppleBlockIsDisplayed(loginText) {
        Page_1.Page.Wait.ElementDisplayed(this.appleLoginBlock, `apple login element`);
        expect(this.appleLoginBlock.getText()).toEqual(loginText);
    }
}
exports.LoginPage = LoginPage;
