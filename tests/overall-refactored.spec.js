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

test('Complete Verification Request Flow', async ({ page }) => {
  test.setTimeout(240000);

  // Test Data
  const testData = {
    email: "gunjiabhiram+dhpregression6@dataflowgroup.com",
    captcha: "123456",
    otp: "123456",
    newUserProfile: {
      salutation: "Mr.",
      firstName: "Suyeon",
      lastName: "Lee",
      mobile: "9876543210",
      dob: { year: "1996", month: "Jan", date: "15" },
      gender: "Male",
      nationality: "Afghanistan",
      profession: "Accountant"
    },
    verification: {
      country: "Norway",
      authority: "The Norwegian Directorate of Health (Helsedirektoratet)",
      speciality: "License Application",
      subSpeciality: "1 Document Verification",
      documents: ["Passport - First Page", "Experience Letter"],
      issuer: {
        name: "BIGFLOW",
        address: "north goa"
      }
    },
    files: {
      passport: "C:/Users/gunjiabhiram_dataflo/Downloads/Passport Sample.jpg",
      experience: "C:/Users/gunjiabhiram_dataflo/Downloads/wipro.png"
    },
    experienceDetails: {
      designation: "Senior QA Engineer",
      startDate: { year: "2020", month: "Dec", day: "20" },
      endDate: { year: "2024", month: "Dec", day: "15" },
      employmentType: "Full-time",
      currentlyWorking: "No",
      firstName: "Suyeon",
      lastName: "Lee"
    },
    payment: {
      cardNumber: "4012001037141112",
      expiryMonth: "12",
      expiryYear: "26",
      cvv: "123",
      cardHolder: "Abhi",
      otp: "123456"
    }
  };

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

  // Step 1: Sign In
  await signinPage.navigate();
  await page.waitForTimeout(2000);
  await signinPage.signIn(testData.email, testData.captcha);
  await page.waitForTimeout(2000);

  // Step 2: Verify OTP
  await fillOtpInputs(page, testData.otp);
  await page.waitForTimeout(2000);

  // Step 3: Check User Type and Handle Onboarding
  const userType = await checkUserType(page);
  
  if (userType === 'new') {
    await aboutYourselfPage.fillAboutYourself(testData.newUserProfile);
    await page.waitForTimeout(2000);
  } else if (userType === 'unexpected') {
    throw new Error("Unexpected redirection after OTP");
  }

  // Step 4: Verify Dashboard Navigation
  await expect(page).toHaveURL(/\/dashboard\/home/);

  // Step 5: Start New Verification
  await homePage.startNewVerification();

  // Step 6: Select Country and Authority
  await homePage.selectCountry(testData.verification.country);
  await homePage.selectAuthority(testData.verification.authority);

  // Step 7: Select Verification Type
  await homePage.selectVerificationType(
    testData.verification.speciality,
    testData.verification.subSpeciality
  );

  // Step 8: Accept Terms and Proceed
  await homePage.acceptTermsAndProceed();

  // Step 9: Select Documents
  await documentSelectionPage.selectMultipleDocuments(testData.verification.documents);

  // Step 10: Continue to Issuer Selection
  await documentSelectionPage.continueToIssuerSelection();
  await issuerSelectionPage.verifyPageLoaded();

  // Step 11: Select Issuer
  await issuerSelectionPage.searchAndSelectIssuer(
    testData.verification.issuer.name,
    testData.verification.issuer.address
  );
  await issuerSelectionPage.continue();

  // Step 12: Verify Pricing Page
  await issuerSelectionPage.verifyPricingPageLoaded();

  // Step 13: Upload Passport Document
  await documentUploadPage.clickUploadDocuments();
  await documentUploadPage.uploadFile(testData.files.passport);
  await documentUploadPage.saveAndContinue();

  // Step 14: Upload Experience Letter and Fill Details
  await documentUploadPage.uploadFile(testData.files.experience);
  await documentUploadPage.fillExperienceLetterDetails(testData.experienceDetails);
  await documentUploadPage.saveAndContinue();

  // Step 15: Skip Additional Documents
  await documentUploadPage.skipAdditionalDocuments();

  // Step 16: Review and Continue
  await reviewSummaryPage.continue();

  // Step 17: E-Sign with OTP
  await reviewSummaryPage.acceptConsentAndESign();
  await fillOtpInputs(page, testData.otp);
  await page.waitForTimeout(3000);

  // Step 18: Submit for Payment
  await reviewSummaryPage.submitForPayment();

  // Step 19: Complete Payment
  await paymentPage.completePayment(testData.payment, testData.payment.otp);

  // Step 20: Verify Success (Optional - add your success verification)
  console.log("Verification request completed successfully!");
});
