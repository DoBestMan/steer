describe('Catalog', () => {
  before(() => {
    cy.visit(
      `${Cypress.env(
        'BASEURL',
      )}vehicles/ford-tires/f-150/2016?oem=141950&tireSize=265-70r17&trim=xlt-4x4`,
    );
  });

  it('does not group toggles on small/med breakpoints', () => {
    cy.viewport(860, 640);
    cy.get('[data-testid=filter-button-popular').should('not.exist');

    cy.viewport(500, 640);
    cy.get('[data-testid=filter-button-popular').should('not.exist');
  });

  it('groups toggles on large breakpoint', () => {
    cy.viewport(1560, 640);
    cy.get('[data-testid=filter-button-popular').should('exist');
  });

  it('displays a modal on small/medium breakpoints', () => {
    cy.viewport(860, 640);
    // hidden in dom so don't need to click to open
    cy.get('[data-testid=dropdown-test-id]').should('not.exist');

    cy.viewport(500, 640);
    cy.get('[data-testid=dropdown-test-id]').should('not.exist');
  });

  it('displays a dropdown on large breakpoint', () => {
    cy.viewport(1560, 640);
    cy.get('[data-testid=dropdown-test-id]').should('exist');
  });
});
