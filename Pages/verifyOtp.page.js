// pages/verifyOtp.page.js
import { expect } from '@playwright/test';
import { verifyOtpLocators } from '../Locators/verifyOtp.locators';

export class VerifyOtpPage {
  constructor(page) {
    this.page = page;
  }

  async assertOtpPageLoaded() {
    await expect(this.page.locator(verifyOtpLocators.otpHeader)).toHaveText('Verify your email');
  }

  async enterOtp(otp) {
    // Wait for all OTP inputs
    for (let i = 0; i < otp.length; i++) {
      await this.page.locator(verifyOtpLocators.otpInput(i)).waitFor({ state: 'visible', timeout: 5000 });
    }

    // Type OTP
    for (let i = 0; i < otp.length; i++) {
      await this.page.locator(verifyOtpLocators.otpInput(i)).fill('');
      await this.page.locator(verifyOtpLocators.otpInput(i)).type(otp[i], { delay: 100 });
    }
  }
}