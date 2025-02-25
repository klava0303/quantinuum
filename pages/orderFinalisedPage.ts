import { expect, Locator, Page } from '@playwright/test';
import { PageManager } from './pageManager';

export class OrderFinalisedPage {
    readonly page: Page;
    readonly title: Locator; 
    readonly confirmation: Locator; 
    readonly confirmationMessage: Locator; 
    readonly homeButton: Locator; 

    constructor(page: Page) {
		this.page = page;
        this.title = page.locator('[data-test="title"]'); 
        this.confirmation = page.locator('[data-test="pony-express"]'); 
        this.confirmationMessage = page.locator('[data-test="complete-header"]'); 
        this.homeButton = page.locator('[data-test="back-to-products"]'); 

    }

    async goToHome() {
        await this.homeButton.click(); 
    }
}