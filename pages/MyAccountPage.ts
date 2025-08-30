import { Page, Locator } from '@playwright/test';

export class MyAccountPage {
  private readonly page: Page;
  private readonly successfulLoginMsg: Locator;
  private readonly lnkLogout: Locator;

  constructor(page: Page) {
    this.page = page;
    this.successfulLoginMsg = page.locator('#content h2:has-text("My Account")');
      this.lnkLogout = page.locator('li a:has-text("Logout")');
  }

  async getSuccessfulLoginMsg() {
    try {
      const msg = await this.successfulLoginMsg.textContent();
      return msg?.trim() || '';
    } catch (err) {
      throw new Error(`Error while getting successful login message: ${err}`);
    }
  }

  async clkLogout() {

        try {
            await this.lnkLogout.click();
        } catch (err) {
            console.error("Exception occurred while clicking logout link", err);
            throw err;
        }
    }
}
