/**
 * Helper function to fill OTP inputs
 * @param {Page} page - Playwright page object
 * @param {string} otp - OTP string (e.g., "123456")
 */
export async function fillOtpInputs(page, otp) {
  for (let i = 0; i < otp.length; i++) {
    await page.locator(`[data-testid="input${i}"]`).fill(otp[i]);
  }
}

/**
 * Helper function to check user type after OTP verification
 * @param {Page} page - Playwright page object
 * @returns {Promise<string>} - Returns 'existing' or 'new' or 'unexpected'
 */
export async function checkUserType(page) {
  const currentUrl = page.url();
  console.log("Current URL:", currentUrl);

  if (currentUrl.includes('/dashboard/home')) {
    console.log("Existing user, redirected to dashboard.");
    return 'existing';
  } else if (currentUrl.includes('/onboarding/about-yourself')) {
    console.log("New user, filling in details.");
    return 'new';
  } else {
    console.log("Unexpected page after OTP. URL:", currentUrl);
    await page.screenshot({ path: 'unexpected_page.png', fullPage: true });
    return 'unexpected';
  }
}

/**
 * Helper function to wait with custom timeout
 * @param {number} ms - Milliseconds to wait
 */
export async function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Helper function to retry an action
 * @param {Function} action - Async function to retry
 * @param {number} maxRetries - Maximum number of retries
 * @param {number} delay - Delay between retries in ms
 */
export async function retryAction(action, maxRetries = 3, delay = 1000) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      await action();
      return;
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await wait(delay);
    }
  }
}
