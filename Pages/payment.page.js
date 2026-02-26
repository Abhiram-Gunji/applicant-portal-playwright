import { paymentLocators } from '../Locators/payment.locators';

export class PaymentPage {
  constructor(page) {
    this.page = page;
  }

  async fillCardDetails(cardDetails) {
    await this.page.fill(paymentLocators.cardNumberInput, cardDetails.cardNumber);
    await this.page.fill(paymentLocators.expiryMonthInput, cardDetails.expiryMonth);
    await this.page.fill(paymentLocators.expiryYearInput, cardDetails.expiryYear);
    await this.page.fill(paymentLocators.cvvInput, cardDetails.cvv);
    await this.page.fill(paymentLocators.cardHolderNameInput, cardDetails.cardHolder);
  }

  async acceptTermsAndPay() {
    await this.page.check(paymentLocators.termsCheckbox);
    await this.page.getByRole('button', { name: /Pay/ }).click();
    await this.page.waitForTimeout(5000);
  }

  async enterOtpAndSubmit(otp) {
    await this.page.fill(paymentLocators.otpInput, otp);
    await this.page.click(paymentLocators.submitOtpButton);
    await this.page.waitForTimeout(5000);
  }

  async completePayment(cardDetails, otp) {
    await this.fillCardDetails(cardDetails);
    await this.acceptTermsAndPay();
    await this.enterOtpAndSubmit(otp);
  }
}
