import { Page, Locator } from '@playwright/test';

export class LoginPage {
  private readonly page: Page;
  private readonly txtemailAddress: Locator;
  private readonly txtPassword: Locator;
  private readonly btnLogin: Locator;
  private readonly failedLoginMsg: Locator;

  constructor(page: Page) {
    this.page = page;
    this.txtemailAddress = page.locator('#input-email');
    this.txtPassword = page.locator('#input-password');
    this.btnLogin = page.locator('input[value="Login"]');
    this.failedLoginMsg = page.locator('.alert.alert-danger.alert-dismissible');
  }

  async fillEmailAddres(emailAddress: string) {
    try {
      await this.txtemailAddress.fill(emailAddress);
    } catch (err) {
      console.error("Exception occurred while entering email address", err);
      throw err;
    }
  }

  async fillPassword(password: string) {
    try {
      await this.txtPassword.fill(password);
    } catch (err) {
      console.error("Exception occurred while entering password", err);
      throw err;
    }
  }

    async clkLoginButton() {
      try {
        await this.btnLogin.click();
      } catch (err) {
        console.error("Exception occurred while clicking login button", err);
        throw err;
      }
    }

  async verifyFailedLogin() {
    try {
      return await this.failedLoginMsg.textContent();
    } catch (err) {
      console.error("Exception occurred while reading failed login message", err);
      throw err;
    }
  }
}