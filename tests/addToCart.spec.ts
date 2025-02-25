import { test, expect } from '@playwright/test';
import { PageManager } from '../pages/pageManager';
import { loginFunc } from './utils';
import { bugReport } from './utils'; 

test.beforeEach(async ({ page }) => {
    await loginFunc(page);
  });

test ('Add first product on the page to cart', async ({ page}) => {
    try 
    {
        const pm = new PageManager(page); 
        //check page title 
        await expect(pm.onInventoryPage().title).toHaveText('Products');

        //check 'Add to cart' button 
        await expect(pm.onInventoryPage().addToCartButton).toBeVisible(); 
        await expect(pm.onInventoryPage().addToCartButton).toHaveText('Add to cart'); 

        //check product price 
        await expect(pm.onInventoryPage().productPrice).not.toBeEmpty(); 

        //check inventory page 
        await pm.onInventoryPage().addToCart();
        await expect(pm.onInventoryPage().cart).toHaveText('1'); 
        await expect(pm.onInventoryPage().addToCartButton).not.toBeVisible();
        await expect(pm.onInventoryPage().removeButton).toBeVisible(); 
        await expect(pm.onInventoryPage().removeButton).toHaveText('Remove'); 
    }
    catch (error) {
        //console.log('Add first product on the page to cart: failed!', error.message);

        //take screenshot 
        //const screenshotPath = `test-failure-${Date.now()}.png`;
        //await page.screenshot({ path: screenshotPath });

        //create bug report in XLS
        bugReport('Add first product on the page to cart', error.message);
        throw error; 
    }
}
)

test ('Information on Cart page is correct', async ({ page}) => {
    try 
        {
        const pm = new PageManager(page); 
        await pm.onInventoryPage().addToCart();
        await pm.onCartPage().goTo(); 
    
        //check that product in the cart is the same as product selected from inventory
        const inventoryProduct = await pm.onInventoryPage().productName.innerText(); 
        const cartProduct = await pm.onCartPage().productName.innerText(); 
        expect (cartProduct).toEqual(inventoryProduct); 

        //check page title 
        await expect(pm.onCartPage().title).toHaveText('Your Cart');

        //check user can modify quantity of the product 
        await expect(pm.onCartPage().quantity).toBeEditable(); 

        //check user can remove product from cart 
        await expect(pm.onCartPage().removeButton).toBeVisible(); 
    }
    catch (error) {
        //console.log("Information on Cart page is correct: failed!", error.message);

        //take screenshot
        //const screenshotPath = `test-failure-${Date.now()}.png`;
        //await page.screenshot({ path: screenshotPath });
    
        //create bug report in XLS
        bugReport('Information on Cart page is correct', error.message);
        throw error; 
    }
}
)