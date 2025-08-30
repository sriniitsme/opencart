//import dependedies 
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { LoginPage } from '../pages/LoginPage';
import { LogoutPage } from '../pages/LogoutPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { DataProvider } from '../utils/dataProvider';
import { TestConfig } from '../test.config';
import { RandomDataUtil } from '../utils/randomDataGenerator';

//Declare shared vaariables
let config: TestConfig;
let homePage: HomePage;
let registrationPage: RegistrationPage;
let loginPage: LoginPage;
let logoutpage: LogoutPage;  
let myaccountPage: MyAccountPage;
let dataprovider: DataProvider;

test.beforeEach(async ({ page }) => {
  config = new TestConfig();
  await page.goto(config.appUrl);
  homePage = new HomePage(page);
  registrationPage = new RegistrationPage(page);
  loginPage = new LoginPage(page);
  logoutpage = new LogoutPage(page)
  dataprovider = new DataProvider();
  myaccountPage = new MyAccountPage(page);
});

test.afterEach(async ({ page }) => {
  // ❌ removed page.close(), Playwright cleans up automatically
  // keep short wait only if debugging
  await page.waitForTimeout(1000);
});

test('verifyLogin @master @sanity @regression', async ({ page }) => {
  

  await homePage.clickMyAccount();
  await homePage.clickOnLogin();
  await loginPage.fillEmailAddres(config.email);
  await loginPage.fillPassword(config.password);
  await loginPage.clkLoginButton();

  // ✅ assert directly on locator (less flaky than grabbing text)
  let LoginSuccessMessage: string | any = await myaccountPage.getSuccessfulLoginMsg();
  expect(LoginSuccessMessage.trim()).toBe('My Account');

  // or using your Page Object method
  //const successLoginMsg = await myaccountPage.getSuccessfulLoginMsg();
  //expect(successLoginMsg).toMatch(/My Account/);
  await homePage.clickMyAccount();          
  await myaccountPage.clkLogout();
  const msglogout = await logoutpage.getSuccessLogoutMsg()
  expect(msglogout).toBe("Account Logout")
  await logoutpage.clkContinue();

});