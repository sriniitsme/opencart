import { Page, Locator } from '@playwright/test';

export class HomePage {

  // Locators
  private readonly page: Page;
  private readonly linkMyAccount: Locator;
  private readonly linkRegister: Locator;
  private readonly linkLogin: Locator;
  private readonly txtSearchBox: Locator;
  private readonly btnSearch: Locator;

  // Constructor
  constructor(page: Page) {
    this.page = page;
    this.linkMyAccount = page.locator('span:has-text("My Account")');
    this.linkRegister = page.locator('a:has-text("Register")');
    this.linkLogin = page.locator('a:has-text("Login")');
    this.txtSearchBox = page.locator('#search input[name="search"]');
    this.btnSearch = page.locator('.input-group-btn button'); // safer: point to actual button
  }

  // ---------- Single Action Methods ----------

  // Check if homepage exists
  async isHomePageExists(): Promise<boolean> {
    try {
      const title = await this.page.title();
      return title?.length > 0;
    } catch (error) {
      console.error("Error while checking home page existence:", error);
      throw error;
    }
  }

  async clickMyAccount(): Promise<void> {
    try {
      await this.linkMyAccount.click();
    } catch (error) {
      throw new Error("My Account link is not clickable or not found.");
    }
  }

  async clickOnRegister(): Promise<void> {
    try {
      await this.linkRegister.click();
    } catch (error) {
      console.error("Register link is not clickable or not found.", error);
      throw error;
    }
  }

  async clickOnLogin(): Promise<void> {
    try {
      await this.linkLogin.click();
    } catch (error) {
      console.error("Login link is not clickable or not found.", error);
      throw error;
    }
  }

  async enterProductName(pName: string): Promise<void> {
    try {
      await this.txtSearchBox.fill(pName);
    } catch (error) {
      console.error("Exception occurred while entering product name", error);
      throw error;
    }
  }

  async clickOnSearch(): Promise<void> {
    try {
      await this.btnSearch.click();
    } catch (error) {
      console.error("Exception occurred while clicking search button", error);
      throw error;
    }
  }

  // ---------- Grouped Actions ----------

  async searchProduct(pName: string): Promise<void> {
    try {
      await this.enterProductName(pName);
      await this.clickOnSearch();
    } catch (error) {
      console.error("Exception occurred while searching a product", error);
      throw error;
    }
  }
}