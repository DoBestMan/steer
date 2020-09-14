describe('Seach By Vehicle', () => {
  it('search by quering', () => {
    // Visit home page
    cy.visit(Cypress.env('BASEURL'));

    // Click search button
    cy.get('[data-testid=search-button]').click();

    // Type query
    cy.get('input[data-testid=search-input]').type('2016 ford f');

    // Click on 2016 Ford F-150
    cy.get('[data-testid=search-results] > li')
      .contains('2016 Ford F‑150')
      .click({ force: true });

    // Type query
    cy.get('input[data-testid=search-input]').should(
      'value',
      '2016 Ford F-150',
    );

    // Wait until results are done updating
    cy.waitUntil(() =>
      cy
        .get('[data-testid=search-results] > li')
        .eq(0)
        .should('not.exist'),
    );

    // Click on 2016 Ford F-150 XLT 4x4
    cy.get('[data-testid=search-results] > li')
      .contains('2016 Ford F-150 XLT 4x4')
      .click({ force: true });

    // Assert if the url changed
    cy.url().should('include', '/vehicles/ford-tires/f-150/2016?trim=xlt-4x4');

    // Click disambiguation button
    cy.get('[data-testid=catalog-cta-list]')
      .contains('265/70R17 115T')
      .click();

    // Assert if the url changed
    cy.url().should(
      'include',
      '/vehicles/ford-tires/f-150/2016?oem=141950&tireSize=265-70r17&trim=xlt-4x4',
    );
  });

  it('search by clicking suggestions', () => {
    // Visit home page
    cy.visit(Cypress.env('BASEURL'));

    // Click search button
    cy.get('[data-testid=search-button]').click();

    // Click vehicle suggestion
    cy.get('h5')
      .contains('Search by')
      .parent()
      .contains('Vehicle')
      .click({ force: true });

    // Assert that search state is 'Vehicle:'
    cy.get('[data-testid=search-state]').contains('Vehicle:');

    // Click on Ford button
    cy.get('[data-testid=search-results] > li')
      .contains('Ford')
      .click({ force: true });

    // Wait until results are done updating
    cy.waitUntil(() =>
      cy
        .get('[data-testid=search-results] > li')
        .eq(0)
        .should('not.exist'),
    );

    // Click on F-150 button
    cy.get('[data-testid=search-results] > li')
      .contains('Ford F-150')
      .click({ force: true });

    // Wait until results are done updating
    cy.waitUntil(() =>
      cy
        .get('[data-testid=search-results] > li')
        .eq(0)
        .should('not.exist'),
    );

    // Click on 2016 button
    cy.get('[data-testid=search-results] > li')
      .contains('Ford F-150 2016')
      .click({ force: true });

    // Wait until results are done updating
    cy.waitUntil(() =>
      cy
        .get('[data-testid=search-results] > li')
        .eq(0)
        .should('not.exist'),
    );

    // Click on XLT 4x4 button
    cy.get('[data-testid=search-results] > li')
      .contains('Ford F-150 2016 XLT 4x4')
      .click({ force: true });

    // Assert if the url changed
    cy.url().should('include', '/vehicles/ford-tires/f-150/2016?trim=xlt-4x4');

    // Click disambiguation button
    cy.get('[data-testid=catalog-cta-list]')
      .contains('265/70R17 115T')
      .click();

    // Assert if the url changed
    cy.url().should(
      'include',
      '/vehicles/ford-tires/f-150/2016?oem=141950&tireSize=265-70r17&trim=xlt-4x4',
    );
  });
});
