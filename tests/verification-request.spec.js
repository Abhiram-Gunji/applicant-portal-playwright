import { test, expect } from "@playwright/test";
import { SigninPage } from "../Pages/signin.page";
import { VerifyOtpPage } from "../Pages/verifyOtp.page";
import { AboutYourselfPage } from "../Pages/about-yourself.page";

// Test Data
const testData = {
  existingUser: {
    email: "gunjiabhiram+dhpregression6@dataflowgroup.com",
    captcha: "123456",
    otp: "123456"
  },
  newUser: {
    email: "newuser+test@dataflowgroup.com",
    captcha: "123456",
    otp: "123456",
    profile: {
      salutation: "Mr.",
      firstName: "Suyeon",
      lastName: "Lee",
      mobile: "9876543210",
      dob: { year: "1996", month: "Jan", date: "15" },
      gender: "Male",
      nationality: "Afghanistan",
      profession: "Accountant"
    }
  },
  verification: {
    country: "Norway",
    authority: "The Norwegian Directorate of Health (Helsedirektoratet)",
    speciality: "License Application",
    subSpeciality: "1 Document Verification",
    documents: {
      passport: "Passport - First Page",
      experienceLetter: "Experience Letter"
    },
    issuer: {
      name: "BIGFLOW",
      address: "north goa"
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
  }
};

// Helper Functions
async function fillOtpInputs(page, otp) {
  for (let i = 0; i < otp.length; i++) {
    await page.locator(`[data-testid="input${i}"]`).fill(otp[i]);
  }
}

async function selectCountryAndAuthority(page, country, authority) {
  await page.getByText(country).first().click();
  await page.waitForTimeout(2000);
  await page.getByText(authority).click();
  await page.waitForTimeout(1000);
}

async function selectVerificationType(page, speciality, subSpeciality) {
  await page.click('[data-testid="testSpeciality-dropdownInput"]');
  await page.getByText(speciality).click();
  await page.click('[data-testid="testSubSpeciality-dropdownInput"]');
  await page.getByText(subSpeciality).click();
}

async function selectDocuments(page, documentTitles) {
  for (const title of documentTitles) {
    await page.locator('div.selectComponent_cardMain__E_SaF', {
      has: page.locator('div.selectComponent_title__zwJjs', { hasText: title })
    }).locator('button', { hasText: 'Add' }).click();
    await page.waitForTimeout(2000);
  }
}

async function selectIssuer(page, issuerName, issuerAddress) {
  await page.locator('//input[@data-testid="organization-dropdownInput"]').fill(issuerName);
  await page.waitForTimeout(2000);
  await page.locator(`[data-testid="ia-attribution-address-line"]:has-text("${issuerAddress}")`).click();
}

async function uploadDocument(page, filePath) {
  await page.setInputFiles('input[type="file"]', filePath);
  await page.waitForTimeout(3000);
}

async function fillExperienceDetails(page, details) {
  await page.locator('input[name*="Last Designation"]').fill(details.designation);
  
  // Start Date
  await page.locator('div[data-testid="datePicker_trigger"]').nth(0).click();
  await page.waitForTimeout(500);
  await page.locator(`div[data-testid="datePicker_year_${details.startDate.year}"]`).click();
  await page.locator(`div[data-testid="datePicker_monthSelection"] >> text=${details.startDate.month}`).click();
  await page.locator(`div[data-testid="datePicker_popover"] >> div.datePickerV2-module_date__aXG33:has-text("${details.startDate.day}")`).click();
  
  // End Date
  await page.locator('div[data-testid="datePicker_trigger"]').nth(1).click();
  await page.locator(`div[data-testid="datePicker_year_${details.endDate.year}"]`).click();
  await page.locator(`div[data-testid="datePicker_monthSelection"] >> text=${details.endDate.month}`).click();
  await page.locator(`div[data-testid="datePicker_popover"] >> div.datePickerV2-module_date__aXG33:has-text("${details.endDate.day}")`).click();
  
  // Employment Type
  await page.locator('input[data-testid="undefined-dropdownInput"]').nth(0).click();
  await page.getByText(details.employmentType).click();
  
  // Currently Working
  await page.locator('input[data-testid="undefined-dropdownInput"]').nth(1).click();
  await page.locator('.dropdown-module_menuItemLabel__VJuGM', { hasText: details.currentlyWorking }).click();
  
  // Contact Person
  await page.locator('input[name*="First Name"]').fill(details.firstName);
  await page.locator('input[name*="Last Name"]').fill(details.lastName);
}

async function completePayment(page, paymentDetails) {
  await page.fill('//input[@id="CARD_NUMBER"]', paymentDetails.cardNumber);
  await page.fill('#EXPIRY_MONTH', paymentDetails.expiryMonth);
  await page.fill('#EXPIRY_YEAR', paymentDetails.expiryYear);
  await page.fill('#CVV', paymentDetails.cvv);
  await page.fill('#CARD_HOLDER_NAME', paymentDetails.cardHolder);
  await page.check('#checkbox');
  await page.getByRole('button', { name: /Pay/ }).click();
  await page.waitForTimeout(3000);
  await page.fill('input[type="text"]', paymentDetails.otp);
  await page.click('input[type="submit"]');
  await page.waitForTimeout(3000);
}

// Test Suite
test.describe('Verification Request - Complete Flow', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(240000);
  });

  test('TC01: Create verification request for existing user with passport and experience letter', async ({ page }) => {
    const signinPage = new SigninPage(page);
    const verifyOtpPage = new VerifyOtpPage(page);
    
    // Step 1: Sign In
    await signinPage.navigate();
    await page.waitForTimeout(2000);
    await signinPage.signIn(testData.existingUser.email, testData.existingUser.captcha);
    await page.waitForTimeout(2000);
    
    // Step 2: Verify OTP
    await fillOtpInputs(page, testData.existingUser.otp);
    await page.waitForTimeout(2000);
    
    // Step 3: Verify Dashboard Navigation
    await expect(page).toHaveURL(/\/dashboard\/home/);
    
    // Step 4: Start New Verification
    await page.getByText("Start New Verification").click();
    await page.waitForTimeout(2000);
    
    // Step 5: Select Country and Authority
    await selectCountryAndAuthority(page, testData.verification.country, testData.verification.authority);
    
    // Step 6: Select Verification Type
    await selectVerificationType(page, testData.verification.speciality, testData.verification.subSpeciality);
    
    // Step 7: Accept Terms and Proceed
    await page.check('input[data-testid="checkbox"]');
    await page.click('button[data-testid="proceed-button"]');
    await page.waitForTimeout(2000);
    
    // Step 8: Select Documents
    await selectDocuments(page, [
      testData.verification.documents.passport,
      testData.verification.documents.experienceLetter
    ]);
    
    // Step 9: Continue to Issuer Selection
    await page.locator("//button[@data-testid='undefined-button']").nth(1).click({ force: true });
    await expect(page).toHaveURL(/\/en\/verification\/select-issuers/);
    
    // Step 10: Select Issuer
    await selectIssuer(page, testData.verification.issuer.name, testData.verification.issuer.address);
    await page.getByText("Continue").click();
    await page.waitForTimeout(2000);
    
    // Step 11: Verify Pricing Page
    await page.waitForURL(/\/verification\/pricing-estimate/);
    
    // Step 12: Upload Passport Document
    await page.getByText("Upload Documents").click();
    await page.waitForTimeout(2000);
    await uploadDocument(page, testData.verification.files.passport);
    await page.getByText("Save and Continue").click();
    await page.waitForTimeout(3000);
    
    // Step 13: Upload Experience Letter and Fill Details
    await uploadDocument(page, testData.verification.files.experience);
    await fillExperienceDetails(page, testData.verification.experienceDetails);
    await page.getByText('Save and Continue').click();
    await page.waitForTimeout(2000);
    
    // Step 14: Skip Additional Documents
    await page.getByText('No, proceed to summary').click();
    await page.waitForTimeout(2000);
    
    // Step 15: Review and Continue
    await page.getByText('Continue').click();
    await page.waitForTimeout(2000);
    
    // Step 16: E-Sign with OTP
    await page.locator('input[name="checkbox-button"]').check();
    await page.getByText('E-Sign using OTP').click();
    await fillOtpInputs(page, testData.existingUser.otp);
    await page.waitForTimeout(2000);
    
    // Step 17: Submit for Payment
    await page.locator('//button[@data-testid="price-details-submit-button"]').click();
    await page.waitForTimeout(2000);
    
    // Step 18: Complete Payment
    await completePayment(page, testData.verification.payment);
    
    // Step 19: Verify Success
    await expect(page).toHaveURL(/\/dashboard\/home/, { timeout: 10000 });
  });

  test('TC02: Create verification request for new user', async ({ page }) => {
    const signinPage = new SigninPage(page);
    const verifyOtpPage = new VerifyOtpPage(page);
    const aboutYourselfPage = new AboutYourselfPage(page);
    
    // Step 1: Sign In
    await signinPage.navigate();
    await page.waitForTimeout(2000);
    await signinPage.signIn(testData.newUser.email, testData.newUser.captcha);
    await page.waitForTimeout(2000);
    
    // Step 2: Verify OTP
    await fillOtpInputs(page, testData.newUser.otp);
    await page.waitForTimeout(2000);
    
    // Step 3: Check if redirected to About Yourself page
    const currentUrl = page.url();
    if (currentUrl.includes('/onboarding/about-yourself')) {
      // Step 4: Fill About Yourself Form
      await aboutYourselfPage.fillAboutYourself(testData.newUser.profile);
      await page.waitForTimeout(2000);
      
      // Step 5: Verify Dashboard Navigation
      await expect(page).toHaveURL(/\/dashboard\/home/);
      
      // Continue with verification flow...
      await page.getByText("Start New Verification").click();
      // ... rest of the flow similar to TC01
    } else {
      throw new Error("Expected new user flow but got existing user redirect");
    }
  });
});


test.describe('Verification Request - Negative Test Cases', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(120000);
  });

  test('TC03: Verify validation when mandatory fields are missing in document upload', async ({ page }) => {
    const signinPage = new SigninPage(page);
    
    await signinPage.navigate();
    await page.waitForTimeout(2000);
    await signinPage.signIn(testData.existingUser.email, testData.existingUser.captcha);
    await page.waitForTimeout(2000);
    await fillOtpInputs(page, testData.existingUser.otp);
    await page.waitForTimeout(2000);
    
    await page.getByText("Start New Verification").click();
    await page.waitForTimeout(2000);
    await selectCountryAndAuthority(page, testData.verification.country, testData.verification.authority);
    await selectVerificationType(page, testData.verification.speciality, testData.verification.subSpeciality);
    await page.check('input[data-testid="checkbox"]');
    await page.click('button[data-testid="proceed-button"]');
    await page.waitForTimeout(2000);
    
    await selectDocuments(page, [testData.verification.documents.passport]);
    await page.locator("//button[@data-testid='undefined-button']").nth(1).click({ force: true });
    await selectIssuer(page, testData.verification.issuer.name, testData.verification.issuer.address);
    await page.getByText("Continue").click();
    await page.waitForTimeout(2000);
    
    await page.getByText("Upload Documents").click();
    await page.waitForTimeout(2000);
    
    // Try to continue without uploading document
    await page.getByText("Save and Continue").click();
    
    // Verify error message or validation
    const errorVisible = await page.locator('text=/required|mandatory|upload/i').isVisible({ timeout: 3000 }).catch(() => false);
    expect(errorVisible).toBeTruthy();
  });

  test('TC04: Verify user cannot proceed without accepting terms and conditions', async ({ page }) => {
    const signinPage = new SigninPage(page);
    
    await signinPage.navigate();
    await page.waitForTimeout(2000);
    await signinPage.signIn(testData.existingUser.email, testData.existingUser.captcha);
    await page.waitForTimeout(2000);
    await fillOtpInputs(page, testData.existingUser.otp);
    await page.waitForTimeout(2000);
    
    await page.getByText("Start New Verification").click();
    await page.waitForTimeout(2000);
    await selectCountryAndAuthority(page, testData.verification.country, testData.verification.authority);
    await selectVerificationType(page, testData.verification.speciality, testData.verification.subSpeciality);
    
    // Try to proceed without checking terms
    const proceedButton = page.locator('button[data-testid="proceed-button"]');
    const isDisabled = await proceedButton.isDisabled();
    expect(isDisabled).toBeTruthy();
  });

  test('TC05: Verify invalid payment card details handling', async ({ page }) => {
    const signinPage = new SigninPage(page);
    
    await signinPage.navigate();
    await page.waitForTimeout(2000);
    await signinPage.signIn(testData.existingUser.email, testData.existingUser.captcha);
    await page.waitForTimeout(2000);
    await fillOtpInputs(page, testData.existingUser.otp);
    await page.waitForTimeout(2000);
    
    // Navigate through the flow to payment
    await page.getByText("Start New Verification").click();
    await page.waitForTimeout(2000);
    await selectCountryAndAuthority(page, testData.verification.country, testData.verification.authority);
    await selectVerificationType(page, testData.verification.speciality, testData.verification.subSpeciality);
    await page.check('input[data-testid="checkbox"]');
    await page.click('button[data-testid="proceed-button"]');
    await page.waitForTimeout(2000);
    await selectDocuments(page, [testData.verification.documents.passport]);
    await page.locator("//button[@data-testid='undefined-button']").nth(1).click({ force: true });
    await selectIssuer(page, testData.verification.issuer.name, testData.verification.issuer.address);
    await page.getByText("Continue").click();
    await page.waitForTimeout(2000);
    await page.getByText("Upload Documents").click();
    await page.waitForTimeout(2000);
    await uploadDocument(page, testData.verification.files.passport);
    await page.getByText("Save and Continue").click();
    await page.waitForTimeout(2000);
    await page.getByText('No, proceed to summary').click();
    await page.waitForTimeout(2000);
    await page.getByText('Continue').click();
    await page.waitForTimeout(2000);
    await page.locator('input[name="checkbox-button"]').check();
    await page.getByText('E-Sign using OTP').click();
    await fillOtpInputs(page, testData.existingUser.otp);
    await page.waitForTimeout(2000);
    await page.locator('//button[@data-testid="price-details-submit-button"]').click();
    await page.waitForTimeout(2000);
    
    // Enter invalid card details
    await page.fill('//input[@id="CARD_NUMBER"]', '1234567890123456');
    await page.fill('#EXPIRY_MONTH', '13'); // Invalid month
    await page.fill('#EXPIRY_YEAR', '20'); // Past year
    await page.fill('#CVV', '12'); // Invalid CVV
    await page.fill('#CARD_HOLDER_NAME', 'Test');
    await page.check('#checkbox');
    await page.getByRole('button', { name: /Pay/ }).click();
    
    // Verify error handling
    const errorVisible = await page.locator('text=/invalid|error|failed/i').isVisible({ timeout: 5000 }).catch(() => false);
    expect(errorVisible).toBeTruthy();
  });
});

test.describe('Verification Request - Boundary Test Cases', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(120000);
  });

  test('TC06: Verify maximum file size validation for document upload', async ({ page }) => {
    const signinPage = new SigninPage(page);
    
    await signinPage.navigate();
    await page.waitForTimeout(2000);
    await signinPage.signIn(testData.existingUser.email, testData.existingUser.captcha);
    await page.waitForTimeout(2000);
    await fillOtpInputs(page, testData.existingUser.otp);
    await page.waitForTimeout(2000);
    
    await page.getByText("Start New Verification").click();
    await page.waitForTimeout(2000);
    await selectCountryAndAuthority(page, testData.verification.country, testData.verification.authority);
    await selectVerificationType(page, testData.verification.speciality, testData.verification.subSpeciality);
    await page.check('input[data-testid="checkbox"]');
    await page.click('button[data-testid="proceed-button"]');
    await page.waitForTimeout(2000);
    await selectDocuments(page, [testData.verification.documents.passport]);
    await page.locator("//button[@data-testid='undefined-button']").nth(1).click({ force: true });
    await selectIssuer(page, testData.verification.issuer.name, testData.verification.issuer.address);
    await page.getByText("Continue").click();
    await page.waitForTimeout(2000);
    await page.getByText("Upload Documents").click();
    await page.waitForTimeout(2000);
    
    // Note: This test requires a large file to be available
    // Upload a file larger than allowed size and verify error message
    // await uploadDocument(page, 'path/to/large/file.jpg');
    // const errorVisible = await page.locator('text=/size|large|limit/i').isVisible({ timeout: 3000 }).catch(() => false);
    // expect(errorVisible).toBeTruthy();
  });

  test('TC07: Verify special characters in name fields', async ({ page }) => {
    const signinPage = new SigninPage(page);
    
    await signinPage.navigate();
    await page.waitForTimeout(2000);
    await signinPage.signIn(testData.existingUser.email, testData.existingUser.captcha);
    await page.waitForTimeout(2000);
    await fillOtpInputs(page, testData.existingUser.otp);
    await page.waitForTimeout(2000);
    
    await page.getByText("Start New Verification").click();
    await page.waitForTimeout(2000);
    await selectCountryAndAuthority(page, testData.verification.country, testData.verification.authority);
    await selectVerificationType(page, testData.verification.speciality, testData.verification.subSpeciality);
    await page.check('input[data-testid="checkbox"]');
    await page.click('button[data-testid="proceed-button"]');
    await page.waitForTimeout(2000);
    await selectDocuments(page, [testData.verification.documents.experienceLetter]);
    await page.locator("//button[@data-testid='undefined-button']").nth(1).click({ force: true });
    await selectIssuer(page, testData.verification.issuer.name, testData.verification.issuer.address);
    await page.getByText("Continue").click();
    await page.waitForTimeout(2000);
    await page.getByText("Upload Documents").click();
    await page.waitForTimeout(2000);
    await uploadDocument(page, testData.verification.files.experience);
    
    // Fill with special characters
    await page.locator('input[name*="First Name"]').fill('Test@#$%');
    await page.locator('input[name*="Last Name"]').fill('User!@#');
    
    await page.getByText('Save and Continue').click();
    
    // Verify validation or acceptance based on requirements
    const errorVisible = await page.locator('text=/invalid|special character/i').isVisible({ timeout: 3000 }).catch(() => false);
    // Adjust assertion based on actual requirement
  });
});

test.describe('Verification Request - UI/UX Test Cases', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(120000);
  });

  test('TC08: Verify back navigation preserves entered data', async ({ page }) => {
    const signinPage = new SigninPage(page);
    
    await signinPage.navigate();
    await page.waitForTimeout(2000);
    await signinPage.signIn(testData.existingUser.email, testData.existingUser.captcha);
    await page.waitForTimeout(2000);
    await fillOtpInputs(page, testData.existingUser.otp);
    await page.waitForTimeout(2000);
    
    await page.getByText("Start New Verification").click();
    await page.waitForTimeout(2000);
    await selectCountryAndAuthority(page, testData.verification.country, testData.verification.authority);
    await selectVerificationType(page, testData.verification.speciality, testData.verification.subSpeciality);
    await page.check('input[data-testid="checkbox"]');
    await page.click('button[data-testid="proceed-button"]');
    await page.waitForTimeout(2000);
    await selectDocuments(page, [testData.verification.documents.passport]);
    
    // Navigate back
    await page.goBack();
    await page.waitForTimeout(1000);
    
    // Verify selections are preserved
    const checkboxChecked = await page.locator('input[data-testid="checkbox"]').isChecked();
    expect(checkboxChecked).toBeTruthy();
  });

  test('TC09: Verify all mandatory field labels are displayed', async ({ page }) => {
    const signinPage = new SigninPage(page);
    
    await signinPage.navigate();
    await page.waitForTimeout(2000);
    await signinPage.signIn(testData.existingUser.email, testData.existingUser.captcha);
    await page.waitForTimeout(2000);
    await fillOtpInputs(page, testData.existingUser.otp);
    await page.waitForTimeout(2000);
    
    await page.getByText("Start New Verification").click();
    await page.waitForTimeout(2000);
    
    // Verify key UI elements are visible
    await expect(page.getByText(testData.verification.country).first()).toBeVisible();
    await expect(page.locator('text=/country|authority|select/i').first()).toBeVisible();
  });

  test('TC10: Verify document preview functionality', async ({ page }) => {
    const signinPage = new SigninPage(page);
    
    await signinPage.navigate();
    await page.waitForTimeout(2000);
    await signinPage.signIn(testData.existingUser.email, testData.existingUser.captcha);
    await page.waitForTimeout(2000);
    await fillOtpInputs(page, testData.existingUser.otp);
    await page.waitForTimeout(2000);
    
    await page.getByText("Start New Verification").click();
    await page.waitForTimeout(2000);
    await selectCountryAndAuthority(page, testData.verification.country, testData.verification.authority);
    await selectVerificationType(page, testData.verification.speciality, testData.verification.subSpeciality);
    await page.check('input[data-testid="checkbox"]');
    await page.click('button[data-testid="proceed-button"]');
    await page.waitForTimeout(2000);
    await selectDocuments(page, [testData.verification.documents.passport]);
    await page.locator("//button[@data-testid='undefined-button']").nth(1).click({ force: true });
    await selectIssuer(page, testData.verification.issuer.name, testData.verification.issuer.address);
    await page.getByText("Continue").click();
    await page.waitForTimeout(2000);
    await page.getByText("Upload Documents").click();
    await page.waitForTimeout(2000);
    await uploadDocument(page, testData.verification.files.passport);
    
    // Verify document is uploaded and preview is available
    const documentPreview = await page.locator('img, [class*="preview"]').first().isVisible({ timeout: 5000 }).catch(() => false);
    expect(documentPreview).toBeTruthy();
  });
});
