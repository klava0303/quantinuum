import { Page } from "playwright/test";
import { LoginPage } from "./loginPage";
import { InventoryPage } from "./inventoryPage"; 
import { CartPage } from "./cartPage";
import { CheckoutInfoPage } from "./checkoutInfoPage";
import { PaymentPage } from "./paymentPage";
import { OrderFinalisedPage } from "./orderFinalisedPage";

export class PageManager {
    readonly page: Page;
    private readonly loginPage: LoginPage;
    readonly inventoryPage: InventoryPage;
    readonly cartPage: CartPage; 
    readonly checkoutInfoPage: CheckoutInfoPage;  
    readonly paymentPage: PaymentPage; 
    readonly orderFinalisedPage: OrderFinalisedPage; 

    constructor(page: Page) {
        this.page = page;

        // login page
        this.loginPage = new LoginPage(page);

        //inventory page 
        this.inventoryPage = new InventoryPage(page); 

        //cart page 
        this.cartPage = new CartPage(page); 

        //checkout information page 
        this.checkoutInfoPage = new CheckoutInfoPage(page); 

        //payment page 
        this.paymentPage = new PaymentPage(page); 

        //order finalised page 
        this.orderFinalisedPage = new OrderFinalisedPage(page); 
    }

    onLoginPage() {
        return this.loginPage;
    }
    onInventoryPage() {
        return this.inventoryPage; 
    }
    onCartPage()
    {
        return this.cartPage; 
    }
    onCheckoutInfoPage() 
    {
        return this.checkoutInfoPage; 
    }
    onPaymentPage()
    {
        return this.paymentPage; 
    }
    onOrderFinalisedPage()
    {
        return this.orderFinalisedPage; 
    }
}