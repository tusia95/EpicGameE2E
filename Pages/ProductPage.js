"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductPage = void 0;
const protractor_1 = require("protractor");
const Common_1 = require("../Common");
const Page_1 = require("./Page");
class ProductPage {
    constructor() {
        this.root = Common_1.Common.ElementByDataComponent(`ProductPage`);
        this.wishButtons = Common_1.Common.ElementsAllByTestId(`wish-button`);
        this.gameEditionTitles = protractor_1.element.all(protractor_1.by.css(`div[class*="TopRow-title_"]`));
        console.log(`Product Page constructor`);
        Page_1.Page.Wait.ElementPresent(this.root, `Product page`);
    }
    ClickAddToWhich(gameNumber, gameTitle) {
        console.log(`Click game version number ${gameNumber} with title ${gameTitle}`);
        this.CheckGameTitle(gameNumber, gameTitle);
        const gameWishButton = this.wishButtons.get(gameNumber - 1);
        Page_1.Page.Wait.ElementPresent(gameWishButton, `game number ${gameNumber} wish button`);
        Common_1.Common.ScrollIntoView(gameWishButton);
        gameWishButton.click();
    }
    CheckGameTitle(gameNumber, gameTitle) {
        console.log(`Check Game title for name with number ${gameNumber} is ${gameTitle}`);
        expect(this.gameEditionTitles.get(gameNumber - 1).getText()).toEqual(gameTitle);
    }
}
exports.ProductPage = ProductPage;
