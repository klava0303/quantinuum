import { test, expect } from '@playwright/test';
import { PageManager } from '../pages/pageManager';
import { loginFunc } from './utils';

test.beforeEach(async ({ page }) => {
    await loginFunc(page);
    const pm = new PageManager(page); 
    await pm.onInventoryPage().addToCart(); 
    await pm.onCartPage().goTo(); 
  });

test ('User can proceed to checkout', async ({ page}) => {
    const pm = new PageManager(page); 

    //check checkout button is available 
    await expect(pm.onCartPage().checkoutButton).toBeVisible(); 

    await pm.onCartPage().cartPage(); 

    //check checkout information page is loaded next 
    await expect(page).toHaveURL('/checkout-step-one.html')
}
)

test ('User can proceed to finalise order', async ({ page}) => {
    const pm = new PageManager(page); 
    await fillCheckoutInfoPage(page); 

    //check page title 
    await expect(pm.onCheckoutInfoPage().title).toHaveText('Checkout: Your Information');

    //check Continue button is available 
    await expect(pm.onCheckoutInfoPage().continueButton).toBeVisible(); 
}
)

test ('Information on final page is correct', async ({ page}) => {
    const pm = new PageManager(page); 
    await fillCheckoutInfoPage(page); 
    await pm.onCheckoutInfoPage().goToNextPage(); 

    //check page title 
    await expect(pm.onPaymentPage().title).toHaveText('Checkout: Overview'); 

    //check payment information 
    await expect(pm.onPaymentPage().paymentInfo).not.toBeEmpty(); 

    //check shipping information 
    await expect(pm.onPaymentPage().shippingInfo).not.toBeEmpty(); 

    //check item total is equal to selected product price 
    const productPrice = await pm.onCartPage().productPrice.innerText(); 
    const itemTotal = await pm.onPaymentPage().productPrice.innerText(); 
    await expect(productPrice).toEqual(itemTotal); 

    //check Finish buton is available 
    await expect(pm.onPaymentPage().finishButton).toBeVisible(); 
}
)

test ('Order is placed successfully', async ({ page}) => {
    const pm = new PageManager(page); 
    await fillCheckoutInfoPage(page); 
    await pm.onPaymentPage().goTo(); 
    await pm.onPaymentPage().paymentPage(); 

    //check page title 
    await expect(pm.onOrderFinalisedPage().title).toHaveText('Checkout: Complete!'); 

    //check confirmation image to be visible 
    await expect(pm.onOrderFinalisedPage().confirmation).toBeVisible(); 

    //check confirmation message 
    await expect(pm.onOrderFinalisedPage().confirmationMessage).toHaveText('Thank you for your order!'); 

    //go back to Home page 
    await pm.onOrderFinalisedPage().goToHome(); 
    await expect(page).toHaveURL('/inventory.html'); 
}
)

async function fillCheckoutInfoPage(page) {
    const pm = new PageManager(page); 
    await pm.onCheckoutInfoPage().goTo();
    await pm.onCheckoutInfoPage().checkoutInfoPage(); 
}