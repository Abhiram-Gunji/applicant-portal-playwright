export const documentUploadLocators = {
  uploadDocumentsButton: 'text=Upload Documents',
  fileInput: 'input[type="file"]',
  countryDropdown: (index) => `(//input[@data-testid="undefined-dropdownInput"])[${index}]`,
  saveAndContinueButton: 'text=Save and Continue',
  
  // Experience Letter specific fields
  lastDesignationInput: 'input[name*="Last Designation"]',
  datePickerTrigger: (index) => `(div[data-testid="datePicker_trigger"])[${index}]`,
  datePickerYear: (year) => `div[data-testid="datePicker_year_${year}"]`,
  datePickerMonth: (month) => `div[data-testid="datePicker_monthSelection"] >> text=${month}`,
  datePickerDay: (day) => `div[data-testid="datePicker_popover"] >> div.datePickerV2-module_date__aXG33:has-text("${day}")`,
  employmentTypeDropdown: '(input[data-testid="undefined-dropdownInput"])[0]',
  employmentTypeOption: (type) => `text=${type}`,
  currentlyWorkingDropdown: '(input[data-testid="undefined-dropdownInput"])[1]',
  currentlyWorkingOption: (option) => `.dropdown-module_menuItemLabel__VJuGM:has-text("${option}")`,
  firstNameInput: 'input[name*="First Name"]',
  lastNameInput: 'input[name*="Last Name"]',
  
  // Additional documents
  noProceedToSummaryButton: 'text=No, proceed to summary'
};
