import { reviewSummaryLocators } from '../Locators/review-summary.locators';

export class ReviewSummaryPage {
  constructor(page) {
    this.page = page;
  }

  async continue() {
    await this.page.getByText(reviewSummaryLocators.continueButton).click();
    await this.page.waitForTimeout(3000);
  }

  async acceptConsentAndESign() {
    await this.page.locator(reviewSummaryLocators.consentCheckbox).check();
    await this.page.getByText(reviewSummaryLocators.eSignButton).click();
  }

  async submitForPayment() {
    await this.page.locator(reviewSummaryLocators.submitButton).click();
  }
}
