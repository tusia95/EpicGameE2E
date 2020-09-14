import { Common } from "../Common";
//import { browser, ProtractorBrowser } from "protractor";
import protractor = require('protractor');
import {by, element, browser} from "protractor";
import { Page } from "./Page";


export class StorePage {

    constructor() {
        console.log(`Store Page constructor`);
        Page.Wait.ElementPresent(this.root, 'Application page');
    }

    public ClickGameCard(cardName: string) {
        console.log(`click game card with name ${cardName}`);
        const cardElement = this.GetGameCardByName(cardName);
        Page.Wait.ElementDisplayed(cardElement,`game card`);
        cardElement.click();
    } 

    public CheckSearchedDropdownValues(gameNames: string[]) {
        console.log(`Check searched games are:`)
        gameNames.forEach((gameName) => {console.log(` gameName = ${gameName} `)});
        Page.Wait.ElementPresent(this.searchDropdownValuesElements.get(gameNames.length - 1), `search bar dropdown`);
            for(let i=0; i< gameNames.length; i++) {
                expect (<any>this.searchDropdownValuesElements.get(i).isDisplayed()).toBe(true);
                expect(<any>this.searchDropdownValuesElements.get(i).getText()).toEqual(gameNames[i]);
       }
         
    }

    public CheckSearchResultsValuesNumber (resultsNumber: number) {
        console.log(`Check search results dropdown contain ${resultsNumber}`);
        expect(<any>this.searchDropdownValuesElements.count()).toEqual(resultsNumber);
    }

    public ClickDropdownValue(gameName: string) {
        console.log(`Click dropdown value ${gameName}`);
        const dropdownValue = this.GetDropdownValueByName(gameName);
        Page.Wait.ElementPresent(dropdownValue, `dropdown value ${gameName}`);
        dropdownValue.click();
        this.CheckAutocomplete(false);

    }

    public ClickSeeMoreLink() {
        console.log(`Click see more link`)
        Page.Wait.ElementPresent(this.seeMoreLink, `see more link`);
        this.seeMoreLink.click();
        this.CheckAutocomplete(false);
    }

    

    public CheckCardGameDisplaying(gameName: string, isDisplayed: boolean) {
        console.log(`Check game with name ${gameName} is displayed = ${isDisplayed}`);
        const cardElement = this.GetGameCardByName(gameName);
        if(isDisplayed) {
            Page.Wait.ElementPresent(cardElement, `game card with name ${gameName}`);
            Page.Wait.ElementDisplayed(cardElement, `game card with name ${gameName}`);
        } else {
            Page.Wait.ElementNotPresent(cardElement, `game card with name ${gameName}`);
        }
    }

    public CheckDisplayedCardNumber(cardNumber: number) {
        console.log(`Check games card number on the page = ${cardNumber}`);
        Page.Wait.ElementPresent(this.offerCardTitleElements.get(cardNumber-1), `Last presented game card`)
        Page.Wait.ElementDisplayed(this.offerCardTitleElements.get(cardNumber-1), `Last displayed game card`)
        expect(<any>this.offerCardTitleElements.count()).toEqual(cardNumber);
    }

    public CheckCardContainsSearchString(searchString: string = ``, cardNumber: number, isNameContainsString = true) {
       console.log(`Check card contains string ${searchString} and search string is in game name = ${isNameContainsString}`); 
       if(isNameContainsString) {
            console.log(`Check game name`)
            Page.Wait.ElementPresent(this.offerCardTitleElements.get(cardNumber-1),`Game name for card number ${cardNumber}`);
            Page.Wait.ElementDisplayed(this.offerCardTitleElements.get(cardNumber-1), `Game name for card number ${cardNumber}`);
            expect(this.offerCardTitleElements.get(cardNumber-1).getText()).toContain(searchString);
            } else {
            console.log(`Check game company`)
            Page.Wait.ElementPresent(this.offerCardCompanyTitleElements.get(cardNumber-1), `Game company for card number ${cardNumber}`);
            Page.Wait.ElementDisplayed(this.offerCardCompanyTitleElements.get(cardNumber-1), `Game company for card number ${cardNumber}`);
            this.offerCardCompanyTitleElements.get(cardNumber-1).getText().then((text)=> {
            expect(text.toLowerCase()).toContain(searchString.toLowerCase());
            }) 
        }
    }

    public SearchGames(searchString: string) {
        console.log(`Input to search field string: ${searchString}`);
        this.searchFieldElement.clear();
        this.searchFieldElement.sendKeys(searchString);
    }

    public ResetSearch() {
        console.log(`click reset search button`);
        Page.Wait.ElementPresent(this.resetSearchButton, `reset search button`);
        Page.Wait.ElementDisplayed(this.resetSearchButton, `reset search button`);
        this.resetSearchButton.click();
        this.CheckAutocomplete(false);
    }

    public CloseCookieBanner() {
        Page.Wait.ElementDisplayed(this.cookieBanner, `cookie banner`);
        this.acceptCookieButton.click();
    }


    private GetGameCardByName(cardName: string) {
        return this.offerCardTitleElements.filter((elem) => {
            return elem.getText().then((val) => {
                return val === cardName;
            });
        }).first();
    }

    private GetDropdownValueByName (gameName: string) {
        return this.searchDropdownValuesElements.filter((elem) => {
            return elem.getText().then((val) => {
                return val === gameName;
            });
        }).first();
    }

    private CheckAutocomplete(isPresent: boolean) {
        expect(<any>this.autocompleteDropdown.isPresent()).toBe(isPresent);
    }
    

    private cookieBanner: protractor.ElementFinder = element(by.css(`div[id="onetrust-banner-sdk"]`));
    private acceptCookieButton: protractor.ElementFinder = element(by.css(`button[id="onetrust-accept-btn-handler"]`));
    private root: protractor.ElementFinder = Common.ElementByDataComponent('AppPage');
    private searchFieldElement: protractor.ElementFinder = Common.ElementByTestId('search-bar');
    private resetSearchButton: protractor.ElementFinder = element(by.css(`button[class*="searchCloseButton"]`))
    private offerCardTitleElements : protractor.ElementArrayFinder = Common.ElementsAllByTestId('offer-title-info-title');
    private offerCardCompanyTitleElements: protractor.ElementArrayFinder = Common.ElementsAllByTestId(`offer-title-info-subtitle`);
    private searchDropdownValuesElements: protractor.ElementArrayFinder = Common.ElementsAllByComponentName(`ResultListItem`);
    private seeMoreLink: protractor.ElementFinder = Common.ElementByDataComponent(`SeeMoreLink`); 
    private autocompleteDropdown: protractor.ElementFinder = element(by.css(`ul[id="search-bar-autocomplete"]`));
    
}