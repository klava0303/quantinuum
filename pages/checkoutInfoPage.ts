import { expect, Locator, Page } from '@playwright/test';
import { PageManager } from './pageManager';

export class CheckoutInfoPage {
    readonly page: Page;
    readonly title: Locator; 
    readonly firstName: Locator; 
    readonly lastName: Locator; 
    readonly zipCode: Locator; 
    readonly continueButton: Locator; 


    constructor(page: Page) {
		this.page = page;
        this.title = page.locator('[data-test="title"]'); 
        this.firstName = page.locator('[data-test="firstName"]'); 
        this.lastName = page.locator('[data-test="lastName"]'); 
        this.zipCode = page.locator('[data-test="postalCode"]'); 
        this.continueButton = page.locator('[data-test="continue"]'); 
    }

    async goTo() {
        await this.page.goto('/checkout-step-one.html');
    }

    async checkoutInfoPage() {
        await this.firstName.waitFor({ state: "visible" });
		await this.firstName.fill("Claudia");
		await this.lastName.fill("Dogaru");
        await this.zipCode.fill("MK42 0EU"); 
    }

    async goToNextPage() {
        await this.continueButton.click(); 
	}
}