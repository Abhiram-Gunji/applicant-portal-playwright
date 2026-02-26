import { documentUploadLocators } from '../Locators/document-upload.locators';

export class DocumentUploadPage {
  constructor(page) {
    this.page = page;
  }

  async clickUploadDocuments() {
    await this.page.getByText(documentUploadLocators.uploadDocumentsButton).click();
    await this.page.waitForTimeout(2000);
  }

  async uploadFile(filePath) {
    await this.page.setInputFiles(documentUploadLocators.fileInput, filePath);
    await this.page.waitForTimeout(4000);
  }

  async saveAndContinue() {
    await this.page.getByText(documentUploadLocators.saveAndContinueButton).click();
    await this.page.waitForTimeout(4000);
  }

  async fillExperienceLetterDetails(details) {
    // Last Designation
    await this.page.locator(documentUploadLocators.lastDesignationInput).fill(details.designation);

    // Start Date
    await this.page.locator(documentUploadLocators.datePickerTrigger(0)).click();
    await this.page.waitForTimeout(1000);
    await this.page.locator(documentUploadLocators.datePickerYear(details.startDate.year)).click();
    await this.page.locator(documentUploadLocators.datePickerMonth(details.startDate.month)).click();
    await this.page.locator(documentUploadLocators.datePickerDay(details.startDate.day)).click();

    // End Date
    await this.page.locator(documentUploadLocators.datePickerTrigger(1)).click();
    await this.page.locator(documentUploadLocators.datePickerYear(details.endDate.year)).click();
    await this.page.locator(documentUploadLocators.datePickerMonth(details.endDate.month)).click();
    await this.page.locator(documentUploadLocators.datePickerDay(details.endDate.day)).click();

    // Employment Type
    await this.page.locator(documentUploadLocators.employmentTypeDropdown).click();
    await this.page.getByText(details.employmentType).click();

    // Currently Working
    await this.page.locator(documentUploadLocators.currentlyWorkingDropdown).click();
    await this.page.locator(documentUploadLocators.currentlyWorkingOption(details.currentlyWorking)).click();

    // Contact Person
    await this.page.locator(documentUploadLocators.firstNameInput).fill(details.firstName);
    await this.page.locator(documentUploadLocators.lastNameInput).fill(details.lastName);
  }

  async skipAdditionalDocuments() {
    await this.page.getByText(documentUploadLocators.noProceedToSummaryButton).click();
    await this.page.waitForTimeout(3000);
  }
}
