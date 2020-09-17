import { checkAndSetLocation } from '../utils/location';

describe('Catalog', () => {
  before(() => {
    // Visit catalog page
    cy.visit(
      `${Cypress.env(
        'BASEURL',
      )}vehicles/ford-tires/f-150/2016?oem=141950&tireSize=265-70r17&trim=xlt-4x4`,
    );
  });

  it('displays the correct Top Picks for vehicle and location', () => {
    // Shows the correct title for vehicle
    cy.get('[data-testid=catalog-title').should(
      'contain.text',
      'f-150 xlt-4x4 2016',
    );

    // No top picks are displayed
    cy.get('[data-testid=top-pick-name]').should('not.exist');

    // Set location to Brooklyn
    checkAndSetLocation('11201', 'Brooklyn, NY');

    // 5 top picks are displayed
    cy.get('[data-testid=top-pick-name]').should((topPicks) => {
      expect(topPicks).to.have.length(5);
    });

    // OE is displayed as the first Top Pick
    cy.get('[data-testid=top-pick-name]')
      .first()
      .should('contain.text', 'Wrangler Fortitude HT');

    // Shows the correct location in catalog header
    cy.get('[data-testid=catalog-header-location').should(
      'contain.text',
      'Brooklyn, NY',
    );
  });

  it('displays products in curated and grid views', () => {
    // Make sure location is set
    checkAndSetLocation('11201', 'Brooklyn, NY');

    // 3 curated product groups are shown
    cy.get('[data-testid=product-group-list]').should((groups) => {
      expect(groups).to.have.length(4);
    });

    // Click to see all tires
    cy.get('[data-testid=catalog-see-all-button]').click();

    // Curated lists are no longer displayed
    cy.get('[data-testid=product-group-list]').should('not.exist');

    // Catalog is in grid view
    cy.get('[data-testid=product-grid]').should('exist');
  });

  it('Paginates products in grid view', () => {
    // In the future, we can run tests against stubbed data to ensure there are
    // enough products to paginate; for now, we'll only make these assertions
    // when pagination is possible

    // If there is a pagination button, we know there are >35 products
    cy.get('[data-testid=pagination-button]').then(() => {
      // Scroll down through the listings
      cy.get('[data-testid=product-placeholder]').last().scrollIntoView({
        duration: 5000,
      });

      // All 35 products are displayed
      cy.get('[data-testid*=product-listing]').should((listings) => {
        expect(listings).to.have.length(35);
      });

      // Load more results
      cy.get('[data-testid=pagination-button]').click();

      // Wait for the first new product to render
      cy.get('[data-testid=product-listing-35]').should('exist');

      // Scroll through the rest
      cy.get('[data-testid=product-placeholder]').last().scrollIntoView({
        duration: 5000,
      });

      // No more placeholders are shown
      cy.get('[data-testid=product-placeholder]').should('not.exist');
    });
  });

  it('Toggles to advanced view', () => {
    // Standard product listings are shown initially
    cy.get('[data-testid*=product-listing]').should('exist');

    // Toggle advanced view
    cy.get('[data-testid=advanced-view-toggle]').click();

    // Standard product listings are not shown
    cy.get('[data-testid*=product-listing]').should('not.exist');

    // Advanced product listings are shown
    cy.get('[data-testid=advanced-listing]').should('exist');

    // Toggle back to standard view
    cy.get('[data-testid=advanced-view-toggle]').click();
    cy.get('[data-testid*=product-listing]').should('exist');
    cy.get('[data-testid=advanced-listing]').should('not.exist');
  });

  it('Navigates to PDP', () => {
    // Click the first top pick
    cy.get('[data-testid="top-pick-button"]').first().click();

    // Navigates to the correct PDP
    cy.url().should(
      'include',
      '/brands/goodyear-tires/wrangler-fortitude-ht#v=1&tireSize=265-70r17&mpn=157042620',
    );
  });
});
