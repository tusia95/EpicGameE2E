import protractor = require('protractor');
import {by, element, browser} from "protractor";
import { Common } from "../Common";
import { Page } from "./Page";


export class ProductPage {

    constructor() {
        console.log(`Product Page constructor`);
        Page.Wait.ElementPresent(this.root, `Product page`);
    }

    public ClickAddToWhish(gameNumber: number, gameTitle: string) {
        console.log(`Click game version number ${gameNumber} with title ${gameTitle}`);
        this.CheckGameTitle(gameNumber, gameTitle);
        const gameWishButton =  this.wishButtons.get(gameNumber - 1);
        Page.Wait.ElementPresent(gameWishButton, `game number ${gameNumber} wish button`);
        Common.ScrollIntoView(gameWishButton);
        gameWishButton.click();
    }

    private CheckGameTitle(gameNumber: number, gameTitle: string) {
        console.log(`Check Game title for name with number ${gameNumber} is ${gameTitle}`);
        expect(this.gameEditionTitles.get(gameNumber-1).getText()).toMatch(gameTitle);
    }

    

    private root: protractor.ElementFinder = Common.ElementByDataComponent(`ProductPage`);
    private wishButtons: protractor.ElementArrayFinder = Common.ElementsAllByTestId(`wish-button`);
    private gameEditionTitles: protractor.ElementArrayFinder = element.all(by.css(`div[class*="TopRow-title_"]`));
}