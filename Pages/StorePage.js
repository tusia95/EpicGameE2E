"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorePage = void 0;
const Common_1 = require("../Common");
const protractor_1 = require("protractor");
const Page_1 = require("./Page");
class StorePage {
    constructor() {
        this.cookieBanner = protractor_1.element(protractor_1.by.css(`div[id="onetrust-banner-sdk"]`));
        this.acceptCookieButton = protractor_1.element(protractor_1.by.css(`button[id="onetrust-accept-btn-handler"]`));
        this.root = Common_1.Common.ElementByDataComponent('AppPage');
        this.searchFieldElement = Common_1.Common.ElementByTestId('search-bar');
        this.resetSearchButton = protractor_1.element(protractor_1.by.css(`button[class*="searchCloseButton"]`));
        this.offerCardTitleElements = Common_1.Common.ElementsAllByTestId('offer-title-info-title');
        this.offerCardCompanyTitleElements = Common_1.Common.ElementsAllByTestId(`offer-title-info-subtitle`);
        this.searchDropdownValuesElements = Common_1.Common.ElementsAllByComponentName(`ResultListItem`);
        this.seeMoreLink = Common_1.Common.ElementByDataComponent(`SeeMoreLink`);
        this.autocompleteDropdown = protractor_1.element(protractor_1.by.css(`ul[id="search-bar-autocomplete"]`));
        this.gameEditionTitle = protractor_1.element(protractor_1.by.css(`div[class*="TopRow-title_"]`));
        console.log(`Store Page constructor`);
        Page_1.Page.Wait.ElementPresent(this.root, 'Application page');
    }
    ClickGameCard(cardName) {
        console.log(`click game card with name ${cardName}`);
        const cardElement = this.GetGameCardByName(cardName);
        Page_1.Page.Wait.ElementDisplayed(cardElement, `game card`);
        cardElement.click();
    }
    CheckSearchedDropdownValues(gameNames) {
        console.log(`Check searched games are:`);
        gameNames.forEach((gameName) => { console.log(` gameName = ${gameName} `); });
        Page_1.Page.Wait.ElementPresent(this.searchDropdownValuesElements.get(gameNames.length - 1), `search bar dropdown`);
        for (let i = 0; i < gameNames.length; i++) {
            expect(this.searchDropdownValuesElements.get(i).isDisplayed()).toBe(true);
            expect(this.searchDropdownValuesElements.get(i).getText()).toEqual(gameNames[i]);
        }
    }
    CheckSearchResultsValuesNumber(resultsNumber) {
        console.log(`Check search results dropdown contain ${resultsNumber}`);
        expect(this.searchDropdownValuesElements.count()).toEqual(resultsNumber);
    }
    ClickDropdownValue(gameName) {
        console.log(`Click dropdown value ${gameName}`);
        const dropdownValue = this.GetDropdownValueByName(gameName);
        Page_1.Page.Wait.ElementPresent(dropdownValue, `dropdown value ${gameName}`);
        dropdownValue.click();
        this.CheckAutocomplete(false);
    }
    ClickSeeMoreLink() {
        console.log(`Click see more link`);
        Page_1.Page.Wait.ElementPresent(this.seeMoreLink, `see more link`);
        this.seeMoreLink.click();
        this.CheckAutocomplete(false);
    }
    CheckCardGameDisplaying(gameName, isDisplayed) {
        console.log(`Check game with name ${gameName} is displayed = ${isDisplayed}`);
        const cardElement = this.GetGameCardByName(gameName);
        if (isDisplayed) {
            Page_1.Page.Wait.ElementPresent(cardElement, `game card with name ${gameName}`);
            Page_1.Page.Wait.ElementDisplayed(cardElement, `game card with name ${gameName}`);
        }
        else {
            Page_1.Page.Wait.ElementNotPresent(cardElement, `game card with name ${gameName}`);
        }
    }
    CheckDisplayedCardNumber(cardNumber) {
        console.log(`Check games card number on the page = ${cardNumber}`);
        Page_1.Page.Wait.ElementPresent(this.offerCardTitleElements.get(cardNumber - 1), `Last presented game card`);
        Page_1.Page.Wait.ElementDisplayed(this.offerCardTitleElements.get(cardNumber - 1), `Last displayed game card`);
        expect(this.offerCardTitleElements.count()).toEqual(cardNumber);
    }
    CheckCardContainsSearchString(searchString = ``, cardNumber, isNameContainsString = true) {
        console.log(`Check card contains string ${searchString} and search string is in game name = ${isNameContainsString}`);
        if (isNameContainsString) {
            console.log(`Check game name`);
            Page_1.Page.Wait.ElementPresent(this.offerCardTitleElements.get(cardNumber - 1), `Game name for card number ${cardNumber}`);
            Page_1.Page.Wait.ElementDisplayed(this.offerCardTitleElements.get(cardNumber - 1), `Game name for card number ${cardNumber}`);
            expect(this.offerCardTitleElements.get(cardNumber - 1).getText()).toContain(searchString);
        }
        else {
            console.log(`Check game company`);
            Page_1.Page.Wait.ElementPresent(this.offerCardCompanyTitleElements.get(cardNumber - 1), `Game company for card number ${cardNumber}`);
            Page_1.Page.Wait.ElementDisplayed(this.offerCardCompanyTitleElements.get(cardNumber - 1), `Game company for card number ${cardNumber}`);
            this.offerCardCompanyTitleElements.get(cardNumber - 1).getText().then((text) => {
                expect(text.toLowerCase()).toContain(searchString.toLowerCase());
            });
        }
    }
    SearchGames(searchString) {
        console.log(`Input to search field string: ${searchString}`);
        this.searchFieldElement.clear();
        this.searchFieldElement.sendKeys(searchString);
    }
    ResetSearch() {
        console.log(`click reset search button`);
        Page_1.Page.Wait.ElementPresent(this.resetSearchButton, `reset search button`);
        Page_1.Page.Wait.ElementDisplayed(this.resetSearchButton, `reset search button`);
        this.resetSearchButton.click();
        this.CheckAutocomplete(false);
    }
    CloseCookieBanner() {
        Page_1.Page.Wait.ElementDisplayed(this.cookieBanner, `cookie banner`);
        this.acceptCookieButton.click();
    }
    GetGameCardByName(cardName) {
        return this.offerCardTitleElements.filter((elem) => {
            return elem.getText().then((val) => {
                return val === cardName;
            });
        }).first();
    }
    GetDropdownValueByName(gameName) {
        return this.searchDropdownValuesElements.filter((elem) => {
            return elem.getText().then((val) => {
                return val === gameName;
            });
        }).first();
    }
    CheckAutocomplete(isPresent) {
        expect(this.autocompleteDropdown.isPresent()).toBe(isPresent);
    }
}
exports.StorePage = StorePage;
