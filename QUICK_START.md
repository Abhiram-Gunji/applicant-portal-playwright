# Quick Start Guide - Verification Request Automation

## 🚀 Getting Started

### 1. Update Test Configuration

Edit `Data/test-config.js` and update file paths:

```javascript
files: {
  passport: "YOUR_PATH/Passport Sample.jpg",
  experience: "YOUR_PATH/wipro.png"
}
```

### 2. Run the Test

```bash
# Run the clean refactored version (RECOMMENDED)
npx playwright test tests/overall-clean.spec.js --headed

# Run comprehensive test suite
npx playwright test tests/verification-request.spec.js
```

## 📁 File Organization

### Where to Find Things

| What You Need | Where to Look |
|---------------|---------------|
| Element selectors | `Locators/*.locators.js` |
| Page actions | `Pages/*.page.js` |
| Test data | `Data/test-config.js` |
| Helper functions | `Utils/testHelpers.js` |
| Tests | `tests/*.spec.js` |

## 🔧 Common Tasks

### Change User Email

```javascript
// Data/test-config.js
users: {
  existingUser: {
    email: "your-new-email@example.com"
  }
}
```

### Add New Document Type

1. **Update test config:**
```javascript
// Data/test-config.js
documents: {
  passport: "Passport - First Page",
  experienceLetter: "Experience Letter",
  newDocument: "New Document Name"  // Add here
}
```

2. **Use in test:**
```javascript
await documentSelectionPage.selectDocument(verification.documents.newDocument);
```

### Change Verification Country

```javascript
// Data/test-config.js
verification: {
  country: "Your Country",
  authority: "Your Authority"
}
```

## 📝 Test Structure Comparison

### ❌ Old Way (overall.spec.js)
```javascript
await page.locator("//input[@placeholder='Enter email ID']").fill("email@example.com");
await page.locator("#applicantOnboardingCaptcha").fill("123456");
await page.click("[data-testid='signInCheckbox']");
await page.click("//div[text()='Get OTP']");
```

### ✅ New Way (overall-clean.spec.js)
```javascript
const signinPage = new SigninPage(page);
await signinPage.signIn(user.email, user.captcha);
```

**Benefits:**
- More readable
- Easier to maintain
- Reusable
- Changes in one place

## 🎯 Key Files

### For Running Tests
- **`tests/overall-clean.spec.js`** ← Start here! (Clean, organized)
- `tests/verification-request.spec.js` (Multiple test scenarios)

### For Modifications
- **`Data/test-config.js`** ← Update test data here
- `Locators/*.locators.js` ← Update selectors when UI changes
- `Pages/*.page.js` ← Update page actions

## 🐛 Troubleshooting

### Test Fails at Sign In
- Check email in `Data/test-config.js`
- Verify captcha value is correct
- Check if website is accessible

### Element Not Found
- Check locator in `Locators/*.locators.js`
- Verify element exists on page
- Check if page loaded completely

### File Upload Fails
- Update file paths in `Data/test-config.js`
- Ensure files exist at specified paths
- Use absolute paths

### Timeout Errors
- Increase timeout in `Data/test-config.js`:
```javascript
timeouts: {
  default: 300000  // 5 minutes
}
```

## 📊 Test Execution Commands

```bash
# Run specific test
npx playwright test tests/overall-clean.spec.js

# Run with browser visible
npx playwright test tests/overall-clean.spec.js --headed

# Run in debug mode (step through)
npx playwright test tests/overall-clean.spec.js --debug

# Run specific test case
npx playwright test tests/verification-request.spec.js --grep "TC01"

# Run all tests
npx playwright test

# Generate HTML report
npx playwright test --reporter=html
npx playwright show-report
```

## 🔄 Workflow

```
1. Update test data (Data/test-config.js)
   ↓
2. Run test (npx playwright test tests/overall-clean.spec.js)
   ↓
3. If test fails:
   - Check locators (Locators/*.locators.js)
   - Check page objects (Pages/*.page.js)
   - Check test data
   ↓
4. Fix and re-run
```

## 📚 Documentation

- **PROJECT_STRUCTURE.md** - Detailed architecture explanation
- **TEST_CASES.md** - Test case documentation
- **QUICK_START.md** - This file

## 💡 Tips

1. **Always use `overall-clean.spec.js`** - It's the most organized version
2. **Update `test-config.js` first** - Before running tests
3. **Use page objects** - Don't write locators directly in tests
4. **Check console logs** - They show which step is executing
5. **Use headed mode** - To see what's happening: `--headed`

## 🎓 Learning Path

1. Start with `tests/overall-clean.spec.js` - See how it's structured
2. Look at `Pages/signin.page.js` - Understand page objects
3. Check `Locators/signin.locators.js` - See how locators are organized
4. Review `Data/test-config.js` - Understand test data structure
5. Try modifying test data and running tests

## ✅ Checklist Before Running

- [ ] Updated file paths in `Data/test-config.js`
- [ ] Verified email credentials
- [ ] Checked files exist at specified paths
- [ ] Playwright is installed (`npm install`)
- [ ] Test environment is accessible

## 🚦 Next Steps

1. Run `npx playwright test tests/overall-clean.spec.js --headed`
2. Watch the test execute
3. Check console for step-by-step progress
4. Review results

---

**Need Help?** Check PROJECT_STRUCTURE.md for detailed documentation.
