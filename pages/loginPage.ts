import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
	readonly page: Page;
	readonly title: Locator;
	readonly username: Locator;
	readonly password: Locator;
	readonly loginButton: Locator;

	constructor(page: Page) {
		this.page = page;
        this.title = page.getByText('Swag Labs')
		this.username = page.locator('[data-test="username"]')
		this.password = page.locator('[data-test="password"]')
		this.loginButton = page.locator('[data-test="login-button"]')
	}

	async goto() {
		await this.page.goto('/');
	}

	async logIn() {
	
		await this.username.waitFor({ state: "visible" });
		await this.username.fill("standard_user");
		await this.password.fill("secret_sauce");
		await this.loginButton.click();
	}
}