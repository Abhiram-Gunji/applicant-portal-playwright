# Verification Request Test Cases

## Overview
This document outlines the test cases for the Applicant Portal Verification Request feature.

## Test Coverage

### 1. Functional Test Cases

#### TC01: Create verification request for existing user with passport and experience letter
**Objective:** Verify that an existing user can successfully create a verification request with multiple documents

**Preconditions:**
- User account exists in the system
- Valid test data is available

**Test Steps:**
1. Navigate to sign-in page
2. Enter valid email and captcha
3. Click "Get OTP"
4. Enter valid OTP
5. Verify redirection to dashboard
6. Click "Start New Verification"
7. Select country (Norway)
8. Select authority (The Norwegian Directorate of Health)
9. Select verification type (License Application)
10. Select sub-speciality (1 Document Verification)
11. Accept terms and conditions
12. Click "Proceed"
13. Select documents (Passport, Experience Letter)
14. Continue to issuer selection
15. Search and select issuer (BIGFLOW)
16. Continue to pricing page
17. Upload passport document
18. Upload experience letter and fill details
19. Skip additional documents
20. Review and continue
21. E-sign using OTP
22. Complete payment
23. Verify success

**Expected Result:** Verification request is created successfully and user is redirected to dashboard

---

#### TC02: Create verification request for new user
**Objective:** Verify that a new user can complete onboarding and create a verification request

**Preconditions:**
- User account does not exist
- Valid test data is available

**Test Steps:**
1. Navigate to sign-in page
2. Enter new email and captcha
3. Click "Get OTP"
4. Enter valid OTP
5. Verify redirection to "About Yourself" page
6. Fill all mandatory fields (salutation, name, mobile, DOB, gender, nationality, profession)
7. Accept consent
8. Click "Continue"
9. Verify redirection to dashboard
10. Continue with verification flow

**Expected Result:** New user completes onboarding and can create verification request

---

### 2. Negative Test Cases

#### TC03: Verify validation when mandatory fields are missing in document upload
**Objective:** Ensure system validates mandatory document uploads

**Test Steps:**
1. Navigate through verification flow to document upload
2. Click "Save and Continue" without uploading document
3. Verify error message is displayed

**Expected Result:** System displays validation error and prevents progression

---

#### TC04: Verify user cannot proceed without accepting terms and conditions
**Objective:** Ensure terms acceptance is mandatory

**Test Steps:**
1. Navigate to verification type selection
2. Select country, authority, and verification type
3. Attempt to click "Proceed" without checking terms checkbox

**Expected Result:** Proceed button is disabled or error is shown

---

#### TC05: Verify invalid payment card details handling
**Objective:** Ensure payment validation works correctly

**Test Steps:**
1. Navigate through verification flow to payment
2. Enter invalid card details (invalid month, past year, short CVV)
3. Click "Pay"

**Expected Result:** System displays appropriate error messages

---

### 3. Boundary Test Cases

#### TC06: Verify maximum file size validation for document upload
**Objective:** Ensure file size limits are enforced

**Test Steps:**
1. Navigate to document upload
2. Attempt to upload file larger than allowed size
3. Verify error message

**Expected Result:** System rejects oversized files with appropriate message

---

#### TC07: Verify special characters in name fields
**Objective:** Test input validation for name fields

**Test Steps:**
1. Navigate to experience letter details
2. Enter special characters in first name and last name fields
3. Attempt to save

**Expected Result:** System validates based on requirements (accept/reject special characters)

---

### 4. UI/UX Test Cases

#### TC08: Verify back navigation preserves entered data
**Objective:** Ensure data persistence during navigation

**Test Steps:**
1. Navigate through verification flow
2. Select documents and options
3. Use browser back button
4. Verify selections are preserved

**Expected Result:** Previously entered data is retained

---

#### TC09: Verify all mandatory field labels are displayed
**Objective:** Ensure UI elements are properly visible

**Test Steps:**
1. Navigate to verification start page
2. Verify all labels and instructions are visible

**Expected Result:** All UI elements render correctly

---

#### TC10: Verify document preview functionality
**Objective:** Ensure uploaded documents can be previewed

**Test Steps:**
1. Navigate to document upload
2. Upload a document
3. Verify preview is displayed

**Expected Result:** Document preview is visible after upload

---

## Test Execution

### Running All Tests
```bash
npx playwright test tests/verification-request.spec.js
```

### Running Specific Test Suite
```bash
npx playwright test tests/verification-request.spec.js --grep "Complete Flow"
npx playwright test tests/verification-request.spec.js --grep "Negative Test Cases"
npx playwright test tests/verification-request.spec.js --grep "Boundary Test Cases"
npx playwright test tests/verification-request.spec.js --grep "UI/UX Test Cases"
```

### Running Specific Test Case
```bash
npx playwright test tests/verification-request.spec.js --grep "TC01"
```

### Running in Headed Mode
```bash
npx playwright test tests/verification-request.spec.js --headed
```

### Running with Debug
```bash
npx playwright test tests/verification-request.spec.js --debug
```

## Test Data Management

Test data is centralized in:
- `tests/verification-request.spec.js` (inline test data)
- `Data/verification-test-data.json` (external JSON file)

Update file paths in test data to match your local environment:
```javascript
files: {
  passport: "C:/Users/YOUR_USERNAME/Downloads/Passport Sample.jpg",
  experience: "C:/Users/YOUR_USERNAME/Downloads/wipro.png"
}
```

## Known Issues & Notes

1. The test uses `page.waitForTimeout()` which is not recommended for production tests. Consider replacing with proper wait conditions.
2. File paths are hardcoded - consider using environment variables or relative paths.
3. OTP is hardcoded as "123456" - this works in test environment only.
4. Some tests use deprecated `page.type()` method - should be replaced with `page.fill()`.

## Future Enhancements

1. Add API validation tests
2. Add performance tests for document upload
3. Add cross-browser compatibility tests
4. Add mobile responsive tests
5. Add accessibility tests
6. Implement data-driven testing with multiple datasets
7. Add screenshot comparison tests
8. Add network request validation
