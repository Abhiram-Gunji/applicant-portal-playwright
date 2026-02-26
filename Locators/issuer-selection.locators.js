export const issuerSelectionLocators = {
  organizationInput: '//input[@data-testid="organization-dropdownInput"]',
  issuerAddress: (address) => `[data-testid="ia-attribution-address-line"]:has-text("${address}")`,
  continueButton: 'text=Continue'
};
