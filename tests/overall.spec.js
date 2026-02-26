import {test,expect} from "@playwright/test"
test('Case1',async({page})=>
{
    test.setTimeout(240000);
    await page.goto("https://app.preprod.dataflowgroup.com/en/onboarding/signin");
    await page.waitForTimeout(2000);
    await page.locator("//input[@placeholder='Enter email ID']").fill("gunjiabhiram+dhpregression6@dataflowgroup.com");
    await page.locator("#applicantOnboardingCaptcha").fill("123456");
    await page.click("[data-testid='signInCheckbox']");
    await page.click("//div[text()='Get OTP']");
    await page.waitForTimeout(2000);
    //await page.pause();

    const otp = "123456";
    for (let i = 0; i < otp.length; i++) 
    {
    await page.type(`[data-testid="input${i}"]`, otp[i]);
    }
    await page.waitForTimeout(2000);
  const currentUrl = page.url();
  console.log("Current URL:", currentUrl);

  if (currentUrl.includes('/dashboard/home')) {
    console.log("Existing user, redirected to dashboard.");
  } else if (currentUrl.includes('/onboarding/about-yourself')) {
    console.log("New user, filling in details.");

    //About Yourself Page
    await page.getByPlaceholder('Select your salutation').click();
    await page.getByText('Mr.', { exact: true }).click();
    await page.locator('input[name="firstName"]').fill('Suyeon');
    await page.locator('input[name="lastName"]').fill('Lee');
    await page.locator('input[name="inputValue"]').fill('9876543210');
    await page.getByText('Select date', { exact: true }).click();
    await page.locator('.datePickerV2-module_chevronLeft__8G7nu').click();
    await page.locator('[data-testid="dob_year_1996"]').click();
    await page.getByText('Jan', { exact: true }).click();
    await page.getByText('15', { exact: true }).click();
    await page.getByTestId('gender-dropdownInput').click();
    await page.getByText('Male', { exact: true }).click();
    await page.getByTestId('nationality-dropdownInput').click();
    await page.getByText('Afghanistan', { exact: true }).click();
    await page.getByTestId('profession-dropdownInput').click();
    await page.getByText('Accountant', { exact: true }).click();
    await page.getByTestId('consentCheckbox').check();
    await page.getByText('Continue', { exact: true }).click();
  } else {
    console.log("Unexpected page after OTP. URL:", currentUrl);
    await page.screenshot({ path: 'unexpected_page.png', fullPage: true });
    throw new Error("Unexpected redirection after OTP");
  }
    //Home page
    await page.getByText("Start New Verification").click();
    //await page.waitForTimeout(2000);
    await page.getByText("Norway").first().click();
    //await page.waitForTimeout(3000);
    await page.getByText("The Norwegian Directorate of Health (Helsedirektoratet)").click();
    //await page.waitForTimeout(1000);
    await page.click('[data-testid="testSpeciality-dropdownInput"]');
    await page.getByText("Authorisation Application").click();
    //await page.waitForTimeout(2000);
    await page.click('[data-testid="testSubSpeciality-dropdownInput"]');
    await page.getByText("1 Document Verification").click();
    //await page.waitForTimeout(2000);
    await page.click('input[data-testid="checkbox"]');
    await page.click('button[data-testid="proceed-button"]');
    //await page.waitForTimeout(2000);

    //await page.locator("//button[@type='button']").nth(0).click();
    await page.locator('div.selectComponent_cardMain__E_SaF', {
    has: page.locator('div.selectComponent_title__zwJjs', {
      hasText: 'Passport - First Page',
    }),
  })
  .locator('button', { hasText: 'Add' })
  .click();
    await page.waitForTimeout(3000);
    //await page.locator("//button[@type='button']").nth(2).click({ force: true });
        await page.locator('div.selectComponent_cardMain__E_SaF',
          {
         has: page.locator('div.selectComponent_title__zwJjs', {hasText: 'Experience Letter',}),
          }).locator('button', { hasText: 'Add' }).click();
    await page.waitForTimeout(1000);
    await page.locator("//button[@data-testid='undefined-button']").nth(1).click({ force: true });
    await expect(page).toHaveURL(/\/en\/verification\/select-issuers/);
    await page.locator('//input[@data-testid="organization-dropdownInput"]').fill('BIGFLOW');
    await page.waitForTimeout(1000);
    await page.locator('[data-testid="ia-attribution-address-line"]:has-text("north goa")').click();
    await page.getByText("Continue").click();
    await page.waitForTimeout(1000);
    await page.waitForURL(/\/verification\/pricing-estimate/);

    await page.getByText("Upload Documents").click();
    await page.waitForTimeout(2000);
    //await page.locator('.documentUpload-module_contentContainer__aof2N').nth(0).click();
    await page.setInputFiles('input[type="file"]','C:/Users/gunjiabhiram_dataflo/Downloads/Passport Sample.jpg');
    await page.waitForTimeout(4000);
    //await page.locator('//input[@data-testid="undefined-dropdownInput"]').nth(0).click();
    //await page.getByText("Andorra").click();
    await page.getByText("Save and Continue").click();
    await page.waitForTimeout(3000);
    await page.setInputFiles('input[type="file"]','C:/Users/gunjiabhiram_dataflo/Downloads/wipro.png');
    await page.waitForTimeout(3000);
    //await expect(page.locator('input[name="AttributeType@lastDesignation-Last Designation-Component@c4487810-f496-4105-b219-5d2a834cc586"]')).toBeVisible();
    //await page.locator('input[name="AttributeType@lastDesignation-Last Designation-Component@c4487810-f496-4105-b219-5d2a834cc586"]').fill('QA');
    await page.locator('div[data-testid="datePicker_trigger"]').nth(0).click();
    await page.waitForTimeout(1000);
    await page.locator('input[name*="Last Designation"]').fill('Senior QA Engineer');
    await page.locator('div[data-testid="datePicker_year_2020"]').click();
    await page.locator('div[data-testid="datePicker_monthSelection"] >> text=Dec').click();
    await page.locator('div[data-testid="datePicker_popover"] >> div.datePickerV2-module_date__aXG33:has-text("20")').click();
    await page.locator('div[data-testid="datePicker_trigger"]').nth(1).click();
    await page.locator('div[data-testid="datePicker_year_2024"]').click();
    await page.locator('div[data-testid="datePicker_monthSelection"] >> text=Dec').click();
    await page.locator('div[data-testid="datePicker_popover"] >> div.datePickerV2-module_date__aXG33:has-text("15")').click();
    await page.locator('input[data-testid="undefined-dropdownInput"]').nth(0).click();
    await page.getByText('Full-time').click();
    await page.locator('input[data-testid="undefined-dropdownInput"]').nth(1).click();
    await page.locator('.dropdown-module_menuItemLabel__VJuGM', { hasText: 'No' }).click();
    await page.locator('input[name*="First Name"]').fill('Suyeon');
    await page.locator('input[name*="Last Name"]').fill('Lee');
    //await page.locator('input[name*="Applicant to contact IA"]').fill('763368887');
    await page.getByText('Save and Continue').click();
    await page.waitForTimeout(3000);
    await page.getByText('No, proceed to summary').click();
    await page.waitForTimeout(3000);
    await page.getByText('Continue').click();
    await page.waitForTimeout(3000);
    await page.locator('input[name="checkbox-button"]').check();
    await page.getByText('E-Sign using OTP').click();
    //await page.pause();
    for (let i = 0; i < otp.length; i++) 
    {
    await page.type(`[data-testid="input${i}"]`, otp[i]);
    }
    await page.waitForTimeout(3000);
    await page.locator('//button[@data-testid="price-details-submit-button"]').click();
    await page.fill('//input[@id="cardnumber"]', '4012001037141112');
    await page.fill('#cc-exp', '1226');
    //await page.fill('#EXPIRY_YEAR', '26');
    await page.fill('#CVV', '123');
    await page.fill('#cardholder-name', 'Abhi');
    //await page.click('#checkbox');
    await page.getByRole('button', { name: /Pay/ }).click();
    await page.pause();
    await page.getByRole('button', { name: 'Track application status' }).click();
    await expect(page.getByRole('button', { name: 'View Summary' })).toBeVisible();







    












})