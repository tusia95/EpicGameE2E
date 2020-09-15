import { Page } from "../Pages/Page";
import { StorePage } from "../Pages/StorePage";
import { WarningPage } from "../Pages/WarningPage";
import { ProductPage } from "../Pages/ProductPage";
import { LoginPage } from "../Pages/LoginPage";

describe("Epic games store, first test", function () {
    beforeEach(() => {
       
    });

    afterEach(() => {
        
    });

    it('Epic games, check store', () => {
        Page.Navigate.Store();
        
        let store = new StorePage();
        store.CloseCookieBanner();

        store.SearchGames(`Red`);
        
        store.CheckSearchedDropdownValues([
            `The Witcher 3: Wild Hunt - Game of the Year Edition`,
            `The Red Lantern`,
            `The Outlast Trials`,
            `Red Dead Redemption 2`
        ])

        store.ResetSearch();////method also check that dropdown is removed from DOM
      
        //input Red again
        store.SearchGames(`Red`);
        store.ClickDropdownValue(`Red Dead Redemption 2`); //method also check that dropdown is removed from DOM

        let warningPage = new WarningPage();
        warningPage.CheckWarningText(`Игра содержит материалы, предназначенные для людей старше 18 лет`);
        warningPage.ClickContinueButton();

        let productPage = new ProductPage();
        productPage.ClickAddToWhish(2, `Red Dead Redemption 2: Special Edition`); 

        let loginPage = new LoginPage();
        loginPage.CheckLoginAppleBlockIsDisplayed(`ВОЙТИ С ПОМОЩЬЮ APPLE`);
    });
});