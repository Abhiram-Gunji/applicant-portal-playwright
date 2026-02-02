// pages/signin.page.js
import { signinLocators } from "../locators/signin.locators";

export class SigninPage {
  constructor(page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto("https://app.preprod.dataflowgroup.com/en/onboarding/signin");
  }

  async signIn(email, captcha) {
    await this.page.fill(signinLocators.emailInput, email);
    await this.page.fill(signinLocators.captchaInput, captcha);
    await this.page.click(signinLocators.consentCheckBox);
    await this.page.click(signinLocators.getOtpButton);
  }
}
