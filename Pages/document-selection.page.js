import { documentSelectionLocators } from '../Locators/document-selection.locators';

export class DocumentSelectionPage {
  constructor(page) {
    this.page = page;
  }

  async selectDocument(documentTitle) {
    await this.page.locator('div.selectComponent_cardMain__E_SaF', {
      has: this.page.locator('div.selectComponent_title__zwJjs', {
        hasText: documentTitle
      })
    }).locator('button', { hasText: 'Add' }).click();
    await this.page.waitForTimeout(3000);
  }

  async selectMultipleDocuments(documentTitles) {
    for (const title of documentTitles) {
      await this.selectDocument(title);
    }
  }

  async continueToIssuerSelection() {
    await this.page.locator(documentSelectionLocators.continueButton).nth(1).click({ force: true });
  }
}
