const setLocation = (zip, location) => {
  // Open the location modal
  cy.get('[data-testid=nav-location-button]').first().click();

  // Enter and select the location
  cy.get('[data-testid=location-input]').type(zip);
  cy.get('[data-testid=location-result]').contains(zip).click();

  // Make sure the location has been set
  cy.get('[data-testid=nav-location-button]')
    .first()
    .should((button) => {
      const text = button.text();

      expect(text).to.contain(location);
    });

  // Reload the page
  cy.reload();
};

export const checkAndSetLocation = (zip, location) => {
  // Find the location button
  cy.get('[data-testid=nav-location-button]')
    .first()
    .then((button) => {
      // If the location is already set, no need to do anything
      if (button.text().includes(location)) {
        return;
      }

      // Otherwise, we'll set the location
      setLocation(zip, location);
    });
};
