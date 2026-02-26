# Project Structure - Verification Request Automation

## Overview
This project follows the **Page Object Model (POM)** design pattern for better maintainability, reusability, and readability.

## Directory Structure

```
├── Data/
│   ├── contracts.json
│   ├── test-config.js                    # Centralized test configuration
│   └── verification-test-data.json       # Additional test data
│
├── Locators/
│   ├── about-yourself.locators.js        # About Yourself page locators
│   ├── document-selection.locators.js    # Document selection locators
│   ├── document-upload.locators.js       # Document upload locators
│   ├── home.js                           # Home/Dashboard locators
│   ├── issuer-selection.locators.js      # Issuer selection locators
│   ├── payment.locators.js               # Payment page locators
│   ├── review-summary.locators.js        # Review & summary locators
│   ├── signin.locators.js                # Sign-in page locators
│   └── verifyOtp.locators.js             # OTP verification locators
│
├── Pages/
│   ├── about-yourself.page.js            # About Yourself page object
│   ├── document-selection.page.js        # Document selection page object
│   ├── document-upload.page.js           # Document upload page object
│   ├── home.page.js                      # Home/Dashboard page object
│   ├── issuer-selection.page.js          # Issuer selection page object
│   ├── payment.page.js                   # Payment page object
│   ├── review-summary.page.js            # Review & summary page object
│   ├── signin.page.js                    # Sign-in page object
│   └── verifyOtp.page.js                 # OTP verification page object
│
├── Utils/
│   ├── envConfig.js                      # Environment configuration
│   └── testHelpers.js                    # Reusable helper functions
│
└── tests/
    ├── example.spec.js                   # Example test
    ├── overall.spec.js                   # Original test (legacy)
    ├── overall-refactored.spec.js        # Refactored version
    ├── overall-clean.spec.js             # Clean version with config
    ├── verification-request.spec.js      # Comprehensive test suite
    └── TEST_CASES.md                     # Test case documentation
```

## Architecture Components

### 1. Locators (`/Locators`)
Contains all element selectors organized by page/feature.

**Purpose:**
- Centralize all element locators
- Easy maintenance when UI changes
- Avoid duplication

**Example:**
```javascript
export const signinLocators = {
  emailInput: "//input[@placeholder='Enter email ID']",
  captchaInput: "#applicantOnboardingCaptcha",
  consentCheckBox: "[data-testid='signInCheckbox']",
  getOtpButton: "//div[text()='Get OTP']"
};
```

### 2. Page Objects (`/Pages`)
Contains page-specific methods and actions.

**Purpose:**
- Encapsulate page interactions
- Provide reusable methods
- Abstract implementation details

**Example:**
```javascript
export class SigninPage {
  constructor(page) {
    this.page = page;
  }

  async signIn(email, captcha) {
    await this.page.fill(signinLocators.emailInput, email);
    await this.page.fill(signinLocators.captchaInput, captcha);
    await this.page.click(signinLocators.consentCheckBox);
    await this.page.click(signinLocators.getOtpButton);
  }
}
```

### 3. Test Data (`/Data`)
Contains test configuration and data.

**Purpose:**
- Centralize test data
- Easy data management
- Environment-specific configurations

**Files:**
- `test-config.js` - Main configuration with all test data
- `verification-test-data.json` - JSON format test data

### 4. Utilities (`/Utils`)
Contains helper functions and utilities.

**Purpose:**
- Reusable helper functions
- Common operations
- Reduce code duplication

**Functions:**
- `fillOtpInputs()` - Fill OTP input fields
- `checkUserType()` - Determine user type after login
- `retryAction()` - Retry failed actions

### 5. Tests (`/tests`)
Contains test specifications.

**Files:**
- `overall-clean.spec.js` - **Recommended** - Clean, well-organized test
- `verification-request.spec.js` - Comprehensive test suite with multiple scenarios
- `overall.spec.js` - Original test (kept for reference)

## Usage

### Running Tests

```bash
# Run the clean refactored test
npx playwright test tests/overall-clean.spec.js

# Run comprehensive test suite
npx playwright test tests/verification-request.spec.js

# Run with UI
npx playwright test tests/overall-clean.spec.js --headed

# Run in debug mode
npx playwright test tests/overall-clean.spec.js --debug
```

### Updating Test Data

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
    passport: "path/to/your/passport.jpg",
    experience: "path/to/your/experience.png"
  }
};
```

### Adding New Page Objects

1. Create locators file in `/Locators`:
```javascript
// Locators/new-page.locators.js
export const newPageLocators = {
  button: '[data-testid="button"]'
};
```

2. Create page object in `/Pages`:
```javascript
// Pages/new-page.page.js
import { newPageLocators } from '../Locators/new-page.locators';

export class NewPage {
  constructor(page) {
    this.page = page;
  }

  async clickButton() {
    await this.page.click(newPageLocators.button);
  }
}
```

3. Use in test:
```javascript
import { NewPage } from '../Pages/new-page.page';

const newPage = new NewPage(page);
await newPage.clickButton();
```

## Best Practices

### 1. Locator Strategy
- Use `data-testid` attributes when available
- Prefer CSS selectors over XPath
- Use descriptive locator names

### 2. Page Objects
- One page object per page/feature
- Methods should represent user actions
- Keep methods focused and single-purpose

### 3. Test Data
- Store in centralized configuration
- Use environment variables for sensitive data
- Keep test data separate from test logic

### 4. Assertions
- Use meaningful assertion messages
- Verify critical checkpoints
- Don't over-assert

### 5. Waits
- Prefer explicit waits over fixed timeouts
- Use `waitForSelector()` instead of `waitForTimeout()`
- Configure timeouts in test config

## Migration Guide

### From `overall.spec.js` to `overall-clean.spec.js`

**Before:**
```javascript
await page.fill("//input[@placeholder='Enter email ID']", "email@example.com");
```

**After:**
```javascript
const signinPage = new SigninPage(page);
await signinPage.signIn(user.email, user.captcha);
```

**Benefits:**
- ✓ More readable
- ✓ Easier to maintain
- ✓ Reusable across tests
- ✓ Changes in one place

## Troubleshooting

### Common Issues

1. **Locator not found**
   - Check if locator is correct in `/Locators` file
   - Verify element exists on page
   - Check for timing issues

2. **Test data issues**
   - Verify file paths in `test-config.js`
   - Check user credentials
   - Ensure test environment is accessible

3. **Timeout errors**
   - Increase timeout in `test-config.js`
   - Add explicit waits
   - Check network conditions

## Contributing

When adding new tests or features:

1. Follow the existing structure
2. Create locators first
3. Build page objects
4. Write tests using page objects
5. Update documentation

## Maintenance

### Regular Tasks

- Review and update locators when UI changes
- Keep test data current
- Remove deprecated tests
- Update documentation

### Code Review Checklist

- [ ] Locators are in separate files
- [ ] Page objects follow POM pattern
- [ ] Test data is externalized
- [ ] Tests are readable and maintainable
- [ ] No hardcoded values in tests
- [ ] Proper error handling
- [ ] Documentation updated
