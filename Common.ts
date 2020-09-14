import {Page} from "./Pages/Page";
import protractor = require('protractor')
import { element, by, browser } from "protractor";

export module Common {
export function ComponentNameCss(componentValue: string): string {
        return "[data-component='{value}']".replace('{value}', componentValue);
    } 

export function TestIdCss(idValue: string): string {
        return "[data-testid='{value}']".replace('{value}', idValue);
    } 


export function ElementByDataComponent(componentValue: string): protractor.ElementFinder {
        return element(by.css(ComponentNameCss(componentValue)));
    }
 
export function ElementByTestId(idValue: string): protractor.ElementFinder {
        return element(by.css(TestIdCss(idValue)));
    } 

export function ElementsAllByTestId(idValue: string): protractor.ElementArrayFinder {
        return element.all(by.css(TestIdCss(idValue)));
    }
    
export function ElementsAllByComponentName(componentValue: string): protractor.ElementArrayFinder {
        return element.all(by.css(ComponentNameCss(componentValue)));
    }   
    
export function ScrollIntoView(target: protractor.ElementFinder) {
        browser.wait(target.isDisplayed().then(function (result) {
            if (!result) {
                browser.executeScript("arguments[0].scrollIntoView();", target.getWebElement());
                console.log('Scroll to element');
            }
            return true;
        }));
    }   
}