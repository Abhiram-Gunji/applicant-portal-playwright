// pages/about-yourself.page.js
import { aboutYourselfLocators } from '../Locators/about-yourself.locators';
import { expect } from '@playwright/test';

export class AboutYourselfPage {
  constructor(page) {
    this.page = page;
  }

  async fillAboutYourself(data) {
    // Salutation
    await this.page.click(aboutYourselfLocators.salutationDropdown);
    await this.page.click(aboutYourselfLocators.salutationOption(data.salutation));

    // Name
    await this.page.fill(aboutYourselfLocators.firstName, data.firstName);
    await this.page.fill(aboutYourselfLocators.lastName, data.lastName);

    // Mobile
    await this.page.fill(aboutYourselfLocators.mobile, data.mobile);

    // DOB
    await this.page.click(aboutYourselfLocators.dobInput);
    await this.page.click(aboutYourselfLocators.dobYear(data.dob.year));
    await this.page.click(aboutYourselfLocators.dobMonth(data.dob.month));
    await this.page.click(aboutYourselfLocators.dobDate(data.dob.date));

    // Gender
    await this.page.click(aboutYourselfLocators.genderDropdown);
    await this.page.click(aboutYourselfLocators.genderOption(data.gender));

    // Nationality
    await this.page.click(aboutYourselfLocators.nationalityDropdown);
    await this.page.click(aboutYourselfLocators.nationalityOption(data.nationality));

    // Profession
    await this.page.click(aboutYourselfLocators.professionDropdown);
    await this.page.click(aboutYourselfLocators.professionOption(data.profession));

    // Consent
    await this.page.check(aboutYourselfLocators.consentCheckbox);

    // Continue
    await this.page.click(aboutYourselfLocators.continueButton);
  }

  async assertPageLoaded() {
    await expect(this.page.locator(aboutYourselfLocators.salutationDropdown)).toBeVisible();
  }
}
