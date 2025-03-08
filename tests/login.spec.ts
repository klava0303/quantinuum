import { test, expect } from '@playwright/test';
import { PageManager } from '../pages/pageManager';
import { loginFunc } from './utils';
import { bugReport } from './utils'; 

test.beforeEach(async ({ page }) => {
    await loginFunc(page);
  });

test('Login page verification', async ({ page }) => {
    await loginTest(page);
});

export async function loginTest(page:any) {
    try {
        const pm = new PageManager(page);    
        await expect(pm.onLoginPage().title).toBeVisible();
        await expect(page).toHaveURL('/inventory.html'); 
    }
    catch (error) {
        //create bug report in XLS
        bugReport('Order is placed successfully', error.message);
        throw error; 
    }
} 