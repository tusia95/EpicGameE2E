import { browser } from "protractor";
import protractor = require('protractor');




export module Page {
    export module Config {
        export module Urls {
            export const store: string = "https://www.epicgames.com/store/ru/";
    }
}

    export module Navigate {
        export function ByUrl(url: string, ignoreSynchronization: boolean = true) {
        console.log("Prepare Browser by url: " + url);

        browser.ignoreSynchronization = ignoreSynchronization;
               (<any>browser.driver.get(url)).catch(function (err: string) {
           console.log('browser get on catch "' + err + '"');
        });
        return browser.wait(function () {
            return browser.getCurrentUrl().then(function (currentUrl: string) {
                return currentUrl.trim().replace(/\/$/, "") === url.trim().replace(/\/$/, "");
                });
            }, 30000, "url isn`t loaded");
        }

        export function Store() {
            ByUrl(Page.Config.Urls.store);
        }

    }
 
        export module Wait {
            export function Url(url: string, timeout: number = 30000, message: string = "url has not changed") {
                console.log('Wait for url "' + url + '"');
                return browser.wait(function () {
                    return browser.getCurrentUrl().then(function (currentUrl: string) {
                        return currentUrl.trim().replace(/\/$/, "") === url.trim().replace(/\/$/, "");
                    });
                }, timeout, message);
            }

           
        export function ElementDisplayed(target: protractor.ElementFinder, elementName: string, timeout: number = 30000) {
            return browser.driver.wait(() => { return target.isDisplayed(); }, timeout, elementName + " not displayed");
        }

        export function ElementsDisplayed (target: protractor.ElementArrayFinder, elementsName: string, timeout: number = 30000) {
            target.count().then((value)=> {
                for(let i = 0; i < value; i++) {
                    return browser.driver.wait(() => { return target.get(i).isDisplayed(); }, timeout, `${elementsName} with number ${i+1} not displayed`);
                }
            })
        }

        export function ElementPresent(target: protractor.ElementFinder, elementName: string, timeout: number = 30000) {
            return browser.driver.wait(() => { return target.isPresent(); }, timeout, elementName + " is not present");
        }

        export function ElementNotPresent(target: protractor.ElementFinder, elementName: string, timeout: number = 30000) {
            return browser.driver.wait(() => { return target.isPresent().then((r) => { return !r; }); }, timeout, elementName + " is present");
        }

        export function ElementNotDisplayed(target: protractor.ElementFinder, elementName: string, timeout: number = 30000) {
            return browser.driver.wait(() => { return target.isDisplayed().then((r) => { return !r; }); }, timeout, elementName + " is displayed");
        }
    
    }
}