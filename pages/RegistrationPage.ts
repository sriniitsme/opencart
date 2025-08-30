import { Page, Locator, expect } from '@playwright/test';

export class RegistrationPage {

    // Locators
    private readonly page: Page;
    private readonly txtFirstName: Locator;
    private readonly txtLastName: Locator;
    private readonly txtEmail: Locator;
    private readonly txtTelephone: Locator;
    private readonly txtPassword: Locator;
    private readonly txtConfirmPassword: Locator;
    private readonly radioSubscribeYes: Locator;
    private readonly radioSubscribeNo: Locator;
    private readonly chkPolicy: Locator;
    private readonly btnContinue: Locator;
    private readonly loginConfirmMessage: Locator;

    // Constructor
    constructor(page: Page) {
        this.page = page;
        this.txtFirstName = page.locator("#input-firstname");
        this.txtLastName = page.locator("#input-lastname");
        this.txtEmail = page.locator("#input-email");
        this.txtTelephone = page.locator("#input-telephone");
        this.txtPassword = page.locator("#input-password");
        this.txtConfirmPassword = page.locator("#input-confirm");
        this.radioSubscribeNo = page.locator("input[value='0'][name='newsletter']");
        this.radioSubscribeYes = page.locator("input[value='1'][name='newsletter']");
        this.chkPolicy = page.locator("input[value='1'][name='agree']");
        this.btnContinue = page.locator("input[value='Continue']");
        this.loginConfirmMessage = page.locator("#content h1");
    }

    // Single action methods
    async enterFirstName(firstName: string) {
        try {
            await this.txtFirstName.fill(firstName);
        } catch (error) {
            throw new Error("Exception occurred while entering first name: " + error);
        }
    }

    async enterLastName(lastname: string) {
        try {
            await this.txtLastName.fill(lastname);
        } catch (error) {
            throw new Error("Exception occurred while entering last name: " + error);
        }
    }

    async enterEmail(email: string) {
        try {
            await this.txtEmail.fill(email);
        } catch (error) {
            throw new Error("Exception occurred while entering email: " + error);
        }
    }

    async enterTelephone(telephone: string) {
        try {
            await this.txtTelephone.fill(telephone);
        } catch (error) {
            throw new Error("Exception occurred while entering telephone: " + error);
        }
    }

    async enterPassword(password: string) {
        try {
            await this.txtPassword.fill(password);
        } catch (error) {
            throw new Error("Exception occurred while entering password: " + error);
        }
    }

    async enterConfirmPassword(confirmpassword: string) {
        try {
            await this.txtConfirmPassword.fill(confirmpassword);
        } catch (error) {
            throw new Error("Exception occurred while entering confirm password: " + error);
        }
    }

    async clickNewsletterSubscrptionYes() {
        try {
            await this.radioSubscribeYes.click();
        } catch (error) {
            throw new Error("Exception occurred while selecting newsletter subscription: Yes - " + error);
        }
    }

    async clickNewsletterSubscrptionNo() {
        try {
            await this.radioSubscribeNo.click();
        } catch (error) {
            throw new Error("Exception occurred while selecting newsletter subscription: No - " + error);
        }
    }

    async clickPrivacyPolicy() {
        try {
            await this.chkPolicy.click();
        } catch (error) {
            throw new Error("Exception occurred while clicking privacy policy checkbox: " + error);
        }
    }

    async clickContinue() {
        try {
            await this.btnContinue.click();
        } catch (error) {
            throw new Error("Exception occurred while clicking continue button: " + error);
        }
    }

    async getLoginConfirmationMessage(): Promise<string> {
        try {
            return (await this.loginConfirmMessage.innerText()).trim();
        } catch (error) {
            throw new Error("Exception occurred while getting login confirmation message: " + error);
        }

    }

    // Grouping Actions
    async completeRegistration(userdata: {
        firstname: string,
        lastname: string,
        email: string,
        telephone: string,
        password: string,
        confirmpassword: string,
    }) {
        try {
            await this.enterFirstName(userdata.firstname);
            await this.enterLastName(userdata.lastname);
            await this.enterEmail(userdata.email);
            await this.enterTelephone(userdata.telephone);
            await this.enterPassword(userdata.password);
            await this.enterConfirmPassword(userdata.confirmpassword);
            await this.clickNewsletterSubscrptionNo();
            await this.clickPrivacyPolicy();
            await this.clickContinue();
            await expect(this.loginConfirmMessage).toBeVisible();
        } catch (error) {
            throw new Error("Exception occurred while submitting registration form: " + error);
        }
    }
}