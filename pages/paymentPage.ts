import { expect, Locator, Page } from '@playwright/test';
import { PageManager } from './pageManager';

export class PaymentPage {
    readonly page: Page;
    readonly title: Locator; 
    readonly quantity: Locator; 
    readonly productName: Locator; 
    readonly productPrice: Locator; 
    readonly paymentInfo: Locator;
    readonly shippingInfo: Locator; 
    readonly itemTotal: Locator;
    readonly tax: Locator; 
    readonly total: Locator;
    readonly finishButton: Locator; 

    constructor(page: Page) {
		this.page = page;
        this.title = page.locator('[data-test="title"]'); 
        this.quantity = page.locator('[data-test="item-quantity"]'); 
        this.productName = page.locator('[data-test="item-4-title-link"]'); 
        this.productPrice = page.locator('[data-test="inventory-item-price"]'); 
        this.paymentInfo = page.locator('[data-test="payment-info-value"]'); 
        this.shippingInfo = page.locator('[data-test="shipping-info-value"]'); 
        this.itemTotal = page.locator('[data-test="subtotal-label"]'); 
        this.tax = page.locator('[data-test="tax-label"]'); 
        this.total = page.locator('[data-test="total-label"]'); 
        this.finishButton = page.locator('[data-test="finish"]'); 
    }

    async goTo() {
		await this.page.goto('/checkout-step-two.html');
	}

    async paymentPage() {
        await this.finishButton.click(); 
    }
}
