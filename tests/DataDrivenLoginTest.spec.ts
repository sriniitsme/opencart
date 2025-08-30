import { test, expect } from '@playwright/test';
import { DataProvider } from '../utils/dataProvider';
import { TestConfig } from '../test.config';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { MyAccountPage } from '../pages/MyAccountPage';

// ✅ Correct relative path
const JSONfilepath = "data/logindata.json";
const testdata = DataProvider.getTestDataFromJson(JSONfilepath);

for (const data of testdata) {
  test(`Verify ${data.testName} @regression`, async ({ page }) => {
    const config = new TestConfig();
    await page.goto(config.appUrl);

    const homepage = new HomePage(page);
    await homepage.clickMyAccount();
    await homepage.clickOnLogin();

    const loginpage = new LoginPage(page);
    await loginpage.fillEmailAddres(data.email);
    await loginpage.fillPassword(data.password);
    await loginpage.clkLoginButton();

    const myaccountpage = new MyAccountPage(page);

    if (data.expected === "success") {
      const successLoginMsg = await myaccountpage.getSuccessfulLoginMsg();
      expect(successLoginMsg).toMatch(/My Account/);
    } else {
      const failedLoginMsg = await loginpage.verifyFailedLogin();
      expect(failedLoginMsg).toMatch(/No match/);
    }
  });
}