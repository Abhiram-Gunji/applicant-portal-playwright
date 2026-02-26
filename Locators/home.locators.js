export const homeLocators = {
  startNewVerificationButton: 'text=Start New Verification',
  countryOption: (country) => `text=${country}`,
  authorityOption: (authority) => `text=${authority}`,
  specialityDropdown: '[data-testid="testSpeciality-dropdownInput"]',
  specialityOption: (speciality) => `text=${speciality}`,
  subSpecialityDropdown: '[data-testid="testSubSpeciality-dropdownInput"]',
  subSpecialityOption: (subSpeciality) => `text=${subSpeciality}`,
  termsCheckbox: 'input[data-testid="checkbox"]',
  proceedButton: 'button[data-testid="proceed-button"]'
};
