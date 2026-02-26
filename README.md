# Verification Request Automation - Playwright

## 📖 Overview

Automated end-to-end testing for the Applicant Portal Verification Request flow using Playwright and the Page Object Model (POM) design pattern.

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Update test data
# Edit Data/test-config.js with your file paths

# 3. Run tests
npx playwright test tests/overall-clean.spec.js --headed
```

## 📁 Project Structure

```
├── Locators/          # Element selectors organized by page
├── Pages/             # Page Object Model implementations
├── Data/              # Test data and configuration
├── Utils/             # Helper functions and utilities
├── tests/             # Test specifications
└── Documentation/     # Project documentation
```

## 📚 Documentation

| Document | Description |
|----------|-------------|
| **[QUICK_START.md](QUICK_START.md)** | Get started in 5 minutes |
| **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)** | Detailed architecture guide |
| **[REFACTORING_SUMMARY.md](REFACTORING_SUMMARY.md)** | What changed and why |
| **[TEST_CASES.md](tests/TEST_CASES.md)** | Test case documentation |

## 🎯 Test Files

### Recommended
- **`tests/overall-clean.spec.js`** - Clean, well-organized single test
- **`tests/verification-request.spec.js`** - Comprehensive test suite (10 test cases)

### Legacy
- `tests/overall.spec.js` - Original test (kept for reference)

## 🏗️ Architecture

### Page Object Model (POM)

```javascript
// Locators (What to find)
export const signinLocators = {
  emailInput: "//input[@placeholder='Enter email ID']"
};

// Page Objects (How to interact)
export class SigninPage {
  async signIn(email, captcha) {
    await this.page.fill(signinLocators.emailInput, email);
  }
}

// Tests (What to test)
const signinPage = new SigninPage(page);
await signinPage.signIn(user.email, user.captcha);
```

## 🔧 Configuration

### Update Test Data

Edit `Data/test-config.js`:

```javascript
export const testConfig = {
  users: {
    existingUser: {
      email: "your-email@example.com",
      captcha: "123456",
      otp: "123456"
    }
  },
  files: {
    passport: "path/to/passport.jpg",
    experience: "path/to/experience.png"
  }
};
```

## 🧪 Running Tests

```bash
# Run clean test
npx playwright test tests/overall-clean.spec.js

# Run with browser visible
npx playwright test tests/overall-clean.spec.js --headed

# Run in debug mode
npx playwright test tests/overall-clean.spec.js --debug

# Run comprehensive test suite
npx playwright test tests/verification-request.spec.js

# Run specific test case
npx playwright test tests/verification-request.spec.js --grep "TC01"

# Generate HTML report
npx playwright test --reporter=html
npx playwright show-report
```

## 📊 Test Coverage

### Complete Flow Test
- ✓ User authentication (sign-in + OTP)
- ✓ New user onboarding
- ✓ Verification request creation
- ✓ Country and authority selection
- ✓ Document selection
- ✓ Issuer selection
- ✓ Document upload (passport + experience letter)
- ✓ Experience details form
- ✓ Review and e-signature
- ✓ Payment processing

### Test Scenarios (verification-request.spec.js)
1. **Functional Tests** (TC01-TC02)
   - Existing user flow
   - New user flow

2. **Negative Tests** (TC03-TC05)
   - Missing mandatory fields
   - Terms not accepted
   - Invalid payment details

3. **Boundary Tests** (TC06-TC07)
   - File size validation
   - Special characters in fields

4. **UI/UX Tests** (TC08-TC10)
   - Back navigation
   - Field labels visibility
   - Document preview

## 🛠️ Key Components

### Locators
All element selectors organized by page:
- `signin.locators.js`
- `verifyOtp.locators.js`
- `home.locators.js`
- `document-selection.locators.js`
- `issuer-selection.locators.js`
- `document-upload.locators.js`
- `review-summary.locators.js`
- `payment.locators.js`

### Page Objects
Reusable page interaction methods:
- `SigninPage` - Authentication
- `VerifyOtpPage` - OTP verification
- `HomePage` - Dashboard actions
- `DocumentSelectionPage` - Document selection
- `IssuerSelectionPage` - Issuer selection
- `DocumentUploadPage` - File uploads
- `ReviewSummaryPage` - Review and e-sign
- `PaymentPage` - Payment processing

### Utilities
Helper functions:
- `fillOtpInputs()` - Fill OTP fields
- `checkUserType()` - Determine user type
- `retryAction()` - Retry failed actions

## 📈 Benefits

- ✅ **Maintainable** - Change locators in one place
- ✅ **Reusable** - Use page objects across tests
- ✅ **Readable** - Self-documenting code
- ✅ **Scalable** - Easy to add new tests
- ✅ **Reliable** - Consistent test execution

## 🐛 Troubleshooting

### Common Issues

**Test fails at sign-in:**
- Check email in `Data/test-config.js`
- Verify website is accessible

**Element not found:**
- Check locator in `Locators/*.locators.js`
- Verify element exists on page

**File upload fails:**
- Update file paths in `Data/test-config.js`
- Use absolute paths

**Timeout errors:**
- Increase timeout in `Data/test-config.js`
- Add explicit waits

## 📝 Adding New Tests

1. **Create locators** in `Locators/`
2. **Create page object** in `Pages/`
3. **Write test** using page objects
4. **Add test data** to `Data/test-config.js`

Example:
```javascript
// 1. Locators/new-page.locators.js
export const newPageLocators = {
  button: '[data-testid="button"]'
};

// 2. Pages/new-page.page.js
export class NewPage {
  async clickButton() {
    await this.page.click(newPageLocators.button);
  }
}

// 3. tests/new-test.spec.js
const newPage = new NewPage(page);
await newPage.clickButton();
```

## 🔄 Migration from Old Tests

```javascript
// Before (overall.spec.js)
await page.locator("//input[@placeholder='Enter email ID']").fill("email");
await page.locator("#applicantOnboardingCaptcha").fill("123456");
await page.click("[data-testid='signInCheckbox']");
await page.click("//div[text()='Get OTP']");

// After (overall-clean.spec.js)
const signinPage = new SigninPage(page);
await signinPage.signIn(user.email, user.captcha);
```

## 📦 Dependencies

- Playwright
- Node.js

## 🤝 Contributing

1. Follow the existing structure
2. Use page objects for all interactions
3. Store test data in `test-config.js`
4. Update documentation

## 📄 License

[Your License Here]

## 👥 Team

[Your Team Information]

---

## 🎯 Next Steps

1. **Read** [QUICK_START.md](QUICK_START.md) for immediate usage
2. **Review** [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) for architecture
3. **Run** the tests and explore the code
4. **Customize** for your needs

---

**Happy Testing! 🎉**
