// locators/about-yourself.locators.js
export const aboutYourselfLocators = {
  salutationDropdown: 'input[placeholder="Select your salutation"]',
  salutationOption: (salutation) => `text=${salutation}`,
  firstName: 'input[name="firstName"]',
  lastName: 'input[name="lastName"]',
  mobile: 'input[name="inputValue"]',
  dobInput: 'text=Select date',
  dobYear: (year) => `[data-testid="dob_year_${year}"]`,
  dobMonth: (month) => `text=${month}`,
  dobDate: (date) => `text=${date}`,
  genderDropdown: '[data-testid="gender-dropdownInput"]',
  genderOption: (gender) => `text=${gender}`,
  nationalityDropdown: '[data-testid="nationality-dropdownInput"]',
  nationalityOption: (country) => `text=${country}`,
  professionDropdown: '[data-testid="profession-dropdownInput"]',
  professionOption: (profession) => `text=${profession}`,
  consentCheckbox: '[data-testid="consentCheckbox"]',
  continueButton: 'text=Continue'
};
