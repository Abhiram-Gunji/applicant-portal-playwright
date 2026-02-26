import { test, expect } from "@playwright/test";
import { SigninPage } from "../Pages/signin.page";
import { VerifyOtpPage } from "../Pages/verifyOtp.page";
import { AboutYourselfPage } from "../Pages/about-yourself.page";
import { HomePage } from "../Pages/home.page";
import { DocumentSelectionPage } from "../Pages/document-selection.page";
import { IssuerSelectionPage } from "../Pages/issuer-selection.page";
import { DocumentUploadPage } from "../Pages/document-upload.page";
import { ReviewSummaryPage } from "../Pages/review-summary.page";
import { PaymentPage } from "../Pages/payment.page";
import { fillOtpInputs, checkUserType } from "../Utils/testHelpers";
import { testConfig } from "../Data/test-config";

test('Complete Verification Request Flow - Refactored', async ({ page }) => {
  test.setTimeout(testConfig.timeouts.default);

  // Initialize Page Objects
  const signinPage = new SigninPage(page);
  const verifyOtpPage = new VerifyOtpPage(page);
  const aboutYourselfPage = new AboutYourselfPage(page);
  const homePage = new HomePage(page);
  const documentSelectionPage = new DocumentSelectionPage(page);
  const issuerSelectionPage = new IssuerSelectionPage(page);
  const documentUploadPage = new DocumentUploadPage(page);
  const reviewSummaryPage = new ReviewSummaryPage(page);
  const paymentPage = new PaymentPage(page);

  // Get test data
  const user = testConfig.users.existingUser;
  const verification = testConfig.verification;
  const files = testConfig.files;
  const experienceDetails = testConfig.experienceDetails;
  const payment = testConfig.payment;

  // ==================== AUTHENTICATION ====================
  
  // Step 1: Sign In
  await signinPage.navigate();
  await page.waitForTimeout(testConfig.timeouts.short);
  await signinPage.signIn(user.email, user.captcha);
  await page.waitForTimeout(testConfig.timeouts.short);

  // Step 2: Verify OTP
  await fillOtpInputs(page, user.otp);
  await page.waitForTimeout(testConfig.timeouts.short);

  // Step 3: Check User Type and Handle Onboarding
  const userType = await checkUserType(page);
  
  if (userType === 'new') {
    await aboutYourselfPage.fillAboutYourself(testConfig.users.newUser.profile);
    await page.waitForTimeout(testConfig.timeouts.short);
  } else if (userType === 'unexpected') {
    throw new Error("Unexpected redirection after OTP");
  }

  // Step 4: Verify Dashboard Navigation
  await expect(page).toHaveURL(/\/dashboard\/home/);

  // ==================== VERIFICATION SETUP ====================

  // Step 5: Start New Verification
  await homePage.startNewVerification();

  // Step 6: Select Country and Authority
  await homePage.selectCountry(verification.country);
  await homePage.selectAuthority(verification.authority);

  // Step 7: Select Verification Type
  await homePage.selectVerificationType(
    verification.speciality,
    verification.subSpeciality
  );

  // Step 8: Accept Terms and Proceed
  await homePage.acceptTermsAndProceed();

  // ==================== DOCUMENT SELECTION ====================

  // Step 9: Select Documents
  await documentSelectionPage.selectMultipleDocuments([
    verification.documents.passport,
    verification.documents.experienceLetter
  ]);

  // Step 10: Continue to Issuer Selection
  await documentSelectionPage.continueToIssuerSelection();
  await issuerSelectionPage.verifyPageLoaded();

  // ==================== ISSUER SELECTION ====================

  // Step 11: Select Issuer
  await issuerSelectionPage.searchAndSelectIssuer(
    verification.issuer.name,
    verification.issuer.address
  );
  await issuerSelectionPage.continue();

  // Step 12: Verify Pricing Page
  await issuerSelectionPage.verifyPricingPageLoaded();

  // ==================== DOCUMENT UPLOAD ====================

  // Step 13: Upload Passport Document
  await documentUploadPage.clickUploadDocuments();
  await documentUploadPage.uploadFile(files.passport);
  await documentUploadPage.saveAndContinue();

  // Step 14: Upload Experience Letter and Fill Details
  await documentUploadPage.uploadFile(files.experience);
  await documentUploadPage.fillExperienceLetterDetails(experienceDetails);
  await documentUploadPage.saveAndContinue();

  // Step 15: Skip Additional Documents
  await documentUploadPage.skipAdditionalDocuments();

  // ==================== REVIEW & E-SIGN ====================

  // Step 16: Review and Continue
  await reviewSummaryPage.continue();

  // Step 17: E-Sign with OTP
  await reviewSummaryPage.acceptConsentAndESign();
  await fillOtpInputs(page, user.otp);
  await page.waitForTimeout(testConfig.timeouts.medium);

  // Step 18: Submit for Payment
  await reviewSummaryPage.submitForPayment();

  // ==================== PAYMENT ====================

  // Step 19: Complete Payment
  await paymentPage.completePayment(payment, payment.otp);

  // ==================== VERIFICATION ====================

  // Step 20: Verify Success
  console.log("✓ Verification request completed successfully!");
});
