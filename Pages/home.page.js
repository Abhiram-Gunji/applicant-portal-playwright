import { homeLocators } from '../Locators/home.locators';

export class HomePage {
  constructor(page) {
    this.page = page;
  }

  async startNewVerification() {
    await this.page.click(homeLocators.startNewVerificationButton);
    await this.page.waitForTimeout(2000);
  }

  async selectCountry(country) {
    await this.page.getByText(country).first().click();
    await this.page.waitForTimeout(3000);
  }

  async selectAuthority(authority) {
    await this.page.getByText(authority).click();
    await this.page.waitForTimeout(1000);
  }

  async selectVerificationType(speciality, subSpeciality) {
    await this.page.click(homeLocators.specialityDropdown);
    await this.page.getByText(speciality).click();
    
    await this.page.click(homeLocators.subSpecialityDropdown);
    await this.page.getByText(subSpeciality).click();
  }

  async acceptTermsAndProceed() {
    await this.page.check(homeLocators.termsCheckbox);
    await this.page.click(homeLocators.proceedButton);
    await this.page.waitForTimeout(2000);
  }
}
