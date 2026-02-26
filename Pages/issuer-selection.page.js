import { issuerSelectionLocators } from '../Locators/issuer-selection.locators';
import { expect } from '@playwright/test';

export class IssuerSelectionPage {
  constructor(page) {
    this.page = page;
  }

  async verifyPageLoaded() {
    await expect(this.page).toHaveURL(/\/en\/verification\/select-issuers/);
  }

  async searchAndSelectIssuer(issuerName, issuerAddress) {
    await this.page.locator(issuerSelectionLocators.organizationInput).fill(issuerName);
    await this.page.waitForTimeout(3000);
    await this.page.locator(issuerSelectionLocators.issuerAddress(issuerAddress)).click();
  }

  async continue() {
    await this.page.getByText(issuerSelectionLocators.continueButton).click();
    await this.page.waitForTimeout(2000);
  }

  async verifyPricingPageLoaded() {
    await this.page.waitForURL(/\/verification\/pricing-estimate/);
  }
}
