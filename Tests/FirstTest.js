"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Page_1 = require("../Pages/Page");
const StorePage_1 = require("../Pages/StorePage");
const WarningPage_1 = require("../Pages/WarningPage");
const ProductPage_1 = require("../Pages/ProductPage");
const LoginPage_1 = require("../Pages/LoginPage");
describe("Epic games store, first test", function () {
    beforeEach(() => {
    });
    afterEach(() => {
    });
    it('Epic games, check store', () => {
        Page_1.Page.Navigate.Store();
        let store = new StorePage_1.StorePage();
        store.CloseCookieBanner();
        store.SearchGames(`Red`);
        store.CheckSearchedDropdownValues([
            `The Witcher 3: Wild Hunt - Game of the Year Edition`,
            `The Red Lantern`,
            `The Outlast Trials`,
            `Red Dead Redemption 2`
        ]);
        store.ResetSearch(); ////method also check that dropdown is removed from DOM
        //input Red again
        store.SearchGames(`Red`);
        store.ClickDropdownValue(`Red Dead Redemption 2`); //method also check that dropdown is removed from DOM
        let warningPage = new WarningPage_1.WarningPage();
        warningPage.CheckWarningText(`Игра содержит материалы, предназначенные для людей старше 18 лет`);
        warningPage.ClickContinueButton();
        let productPage = new ProductPage_1.ProductPage();
        productPage.ClickAddToWhich(2, `Red Dead Redemption 2: Special Edition`);
        let loginPage = new LoginPage_1.LoginPage();
        loginPage.CheckLoginAppleBlockIsDisplayed(`ВОЙТИ С ПОМОЩЬЮ APPLE`);
    });
});
