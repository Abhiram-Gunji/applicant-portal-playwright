import { test } from '@playwright/test';
import { SigninPage} from '../Pages/signin.page';
import { VerifyOtpPage } from '../Pages/verifyOtp.page';
import { AboutYourselfPage } from '../Pages/about-yourself.page';
const aboutYourselfData = {
  salutation: 'Mr.',
  firstName: 'Suyeon',
  lastName: 'Lee',
  mobile: '9876543210',
  dob: {
    year: '1996',
    month: 'Jan',
    date: '15'
  },
  gender: 'Male',
  nationality: 'Afghanistan',
  profession: 'Accountant'
};

test('Authentication flow: User can sign in, verify OTP, and fill About Yourself', async ({ page }) => {
  const signinPage = new SigninPage(page);
  const verifyOtpPage = new VerifyOtpPage(page);
  const aboutYourselfPage = new AboutYourselfPage(page);
  await signinPage.navigate();
  await signinPage.signIn('gunjiabhiram+automation4@dataflowgroup.com', '123456');

  await verifyOtpPage.assertOtpPageLoaded();
  await verifyOtpPage.enterOtp('123456');
  await page.waitForTimeout(2000);
  const currentUrl = page.url();
  if (currentUrl.includes('/onboarding/about-yourself')) {
    await aboutYourselfPage.assertPageLoaded();
    await aboutYourselfPage.fillAboutYourself(aboutYourselfData);
  }
});
