import { test, expect } from '@playwright/test'
import { HomePage } from '../pages/HomePage'
import { RegistrationPage } from '../pages/RegistrationPage'
import { DataProvider } from '../utils/dataProvider'
import { TestConfig } from '../test.config'
import { RandomDataUtil } from '../utils/randomDataGenerator'

let config: TestConfig;
let homePage: HomePage;
let registrationPage: RegistrationPage;

test.beforeEach(async ({ page }) => {
    config = new TestConfig();
    await page.goto(config.appUrl);
    homePage = new HomePage(page);
    registrationPage = new RegistrationPage(page)
})

test.afterEach(async ({ page }) => {
    await page.waitForTimeout(3000)
    await page.close()
})

test('user resigtrtion test @master @sanity @regression', async ({ page }) => {
    await homePage.clickMyAccount()
    await homePage.clickOnRegister()
    await registrationPage.enterFirstName(RandomDataUtil.getFirstName())
    await registrationPage.enterLastName(RandomDataUtil.getlastName())
    await registrationPage.enterEmail(RandomDataUtil.getEmail())
    await registrationPage.enterTelephone(RandomDataUtil.getPhoneNumber())
    const password = RandomDataUtil.getPassword()
    await registrationPage.enterPassword(password)
    await registrationPage.enterConfirmPassword(password)
    await registrationPage.clickNewsletterSubscrptionNo()
    await registrationPage.clickPrivacyPolicy()
    await registrationPage.clickContinue()
    const confirmationMessage = await registrationPage.getLoginConfirmationMessage();
    expect(confirmationMessage).toContain('Your Account Has Been Created!');
    await page.waitForTimeout(3000);

})