import { Page, Locator } from '@playwright/test'

export class LogoutPage {

    private readonly page: Page;
    private readonly msgSuccessLogout: Locator;
    private readonly btnContinue: Locator;

    constructor(page: Page) {
        this.page = page;
        this.msgSuccessLogout = page.locator('h1:has-text("Account Logout")')
        this.btnContinue = page.locator('a:has-text("Continue")');
    }

    async getSuccessLogoutMsg() {
        try {
            return await this.msgSuccessLogout.textContent()
        } catch (err) {
            console.error("Exception occurred while getting successfull logout message", err);
            throw err;
        }
    }
    async clkContinue() {

        try {
            await this.btnContinue.click
        } catch (err) {
            console.error("Exception occurred while clicking continue button", err);
            throw err;
        }
    }

}        
