import { test, request, expect } from '@playwright/test';
import fs from 'fs';

test('Login to portal using API (Captcha + OTP)', async ({ browser }) => {

  // =========================
  // 1. Create API context
  // =========================
  const apiContext = await request.newContext({
    baseURL: 'https://app.preprod.dataflowgroup.com',
    extraHTTPHeaders: {
      'Content-Type': 'application/json'
    }
  });

  // =========================
  // 2. Generate Captcha
  // =========================
  const captchaRes = await apiContext.post('/api/onboarding/captcha');
  expect(captchaRes.ok()).toBeTruthy();

  const captchaJson = await captchaRes.json();
  const captchaId = captchaJson.data.id;
  const captchaBase64 = captchaJson.data.captchaBase64;

  console.log('Captcha ID:', captchaId);

  // Save captcha image so you can read it
  const base64Image = captchaBase64.replace(/^data:image\/png;base64,/, '');
  fs.writeFileSync('captcha.png', base64Image, 'base64');
  console.log('Captcha saved as captcha.png');

  // =========================
  // 3. Verify Captcha
  // =========================
  // ⛔ IMPORTANT: open captcha.png and read the text
  const captchaText = 'REPLACE_WITH_IMAGE_TEXT';

  const verifyCaptchaRes = await apiContext.post('/api/onboarding/captcha/verify', {
    data: {
      id: captchaId,
      captchaText: captchaText
    }
  });

  console.log('Verify captcha status:', verifyCaptchaRes.status());
  console.log('Verify captcha body:', await verifyCaptchaRes.text());
  expect(verifyCaptchaRes.ok()).toBeTruthy();

  // =========================
  // 4. Send OTP
  // =========================
  const sendOtpRes = await apiContext.post('/api/onboarding/login/otp', {
    data: {
      email: 'gunjiabhiram@dataflowgroup.com'
    }
  });

  console.log('Send OTP status:', sendOtpRes.status());
  expect(sendOtpRes.ok()).toBeTruthy();

  const sendOtpJson = await sendOtpRes.json();
  const otpToken = sendOtpJson.data.otpToken;
  console.log('OTP Token:', otpToken);

  // =========================
  // 5. Verify OTP
  // =========================
  const verifyOtpRes = await apiContext.post('/api/onboarding/login/otp', {
    data: {
      email: 'gunjiabhiram@dataflowgroup.com',
      otp: '123456', // staging/preprod OTP
      otpToken: otpToken
    }
  });

  console.log('Verify OTP status:', verifyOtpRes.status());
  console.log('Verify OTP body:', await verifyOtpRes.text());
  expect(verifyOtpRes.ok()).toBeTruthy();

  console.log('OTP verified successfully');

  // =========================
  // 6. Open browser (already logged in)
  // =========================
  const context = await browser.newContext({
    storageState: await apiContext.storageState()
  });

  const page = await context.newPage();
  await page.goto('https://app.preprod.dataflowgroup.com');

  await expect(page).toHaveURL(/dashboard|home|onboarding/);
  console.log('User is logged in 🎉');
});
