import { expect, Locator, Page } from '@playwright/test';
import { PageManager } from './pageManager';

export class CartPage {
    readonly page: Page;
	readonly title: Locator;
    readonly productName: Locator; 
    readonly checkoutButton: Locator; 
    readonly quantity: Locator; 
    readonly productPrice: Locator;
    readonly removeButton: Locator; 

    constructor(page: Page) {
		this.page = page;
        this.title = page.locator('[data-test="title"]')
        this.productName = page.locator('[data-test="item-4-title-link"]')
        this.checkoutButton = page.locator('[data-test="checkout"]')
        this.quantity = page.locator('[data-test="item-quantity"]')
        this.productPrice = page.locator('[data-test="inventory-item-price"]')
        this.removeButton = page.locator('[data-test="remove-sauce-labs-backpack"]')
    }

    async goTo() {
		await this.page.goto('/cart.html');
	}

    async cartPage() {
        await this.checkoutButton.click(); 
    }
}