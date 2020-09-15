describe('Catalog', () => {
  before(() => {
    // set to large breakpoint
    cy.viewport(1300, 860);
    cy.visit(
      `${Cypress.env(
        'BASEURL',
      )}vehicles/ford-tires/f-150/2016?oem=141950&tireSize=265-70r17&trim=xlt-4x4`,
    );
  });

  it('previews filter count upon modification', () => {
    cy.server();

    // open popup
    cy.get('[data-testid=filter-button-SiteCatalogFilterList]').first().click();

    cy.get('[data-testid=dropdown-test-id-open]').within(() => {
      cy.route({
        method: 'GET',
        url: '**/products-vehicle**',
      }).as('previewFilters');

      // initial filter results count
      let initialCount = 0;
      cy.get('[data-testid=primary-button]')
        .invoke('text')
        .then((text) => {
          initialCount = parseInt(text.split(' ')[1]);
        });

      // select first checkbox
      cy.get('[data-testid=filter-checkbox-list]').within(() => {
        // native checkbox is hidden so click containing el
        cy.get('input[type="checkbox"]').first().parent().click();
      });

      cy.wait('@previewFilters');

      // filtered results should be less than previous count
      cy.get('[data-testid=primary-button]')
        .invoke('text')
        .should((text) => {
          const resultsCount = parseInt(text.split(' ')[1]);

          expect(resultsCount).to.be.lessThan(initialCount);
        });
    });
  });

  it('resets modified filters', () => {
    cy.server();
    cy.route({
      method: 'GET',
      url: '**/products-vehicle**',
    }).as('previewFilters');

    // previewed count from the last call
    let previewedCount = 0;
    cy.get('[data-testid=primary-button]')
      .invoke('text')
      .then((text) => {
        previewedCount = parseInt(text.split(' ')[1]);
      });

    // reset filters
    cy.get('[data-testid=dropdown-test-id-open]').within(() => {
      cy.get('[data-testid=secondary-button]').click();

      cy.wait('@previewFilters');

      // reset results count should be greater than the previous count
      cy.get('[data-testid=primary-button]')
        .invoke('text')
        .should((text) => {
          const resultsCount = parseInt(text.split(' ')[1]);

          expect(resultsCount).to.be.greaterThan(previewedCount);
        });

      // first checkbox should now be unselected
      cy.get('[data-testid=filter-checkbox-list]').within(() => {
        cy.get('input[type="checkbox"]').should((checkboxes) => {
          expect(checkboxes.first()).not.to.be.checked;
        });
      });
    });
  });

  it('applies modified filters', () => {
    cy.reload();
    cy.get('[data-testid=filter-button-SiteCatalogFilterList]').first().click();
    cy.server();
    cy.route({
      method: 'GET',
      url: '**/products-vehicle**',
    }).as('previewFilters');
    cy.get('[data-testid=dropdown-test-id-open]').within(() => {
      // re-select first checkbox
      cy.get('[data-testid=filter-checkbox-list]').within(() => {
        cy.get('input[type="checkbox"]').first().parent().parent().click();
      });
      cy.wait('@previewFilters');

      cy.get('[data-testid=primary-button]').click();
    });

    cy.get('[data-testid=dropdown-test-id-open]').should('not.exist');

    // catalog header matches previewed results count
    let countToApply = 0;
    cy.get('[data-testid=primary-button]')
      .invoke('text')
      .then((text) => {
        countToApply = parseInt(text.split(' ')[1]);
      });
    cy.get('[data-testid=catalog-title')
      .invoke('text')
      .should((text) => {
        expect(parseInt(text.split(' ')[0])).to.equal(countToApply);
      });
  });
});
