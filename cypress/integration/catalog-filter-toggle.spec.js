describe('Catalog', () => {
  before(() => {
    cy.viewport(860, 640);
    cy.visit(
      `${Cypress.env(
        'BASEURL',
      )}vehicles/ford-tires/f-150/2016?oem=141950&tireSize=265-70r17&trim=xlt-4x4`,
    );
  });

  it('applies a toggle filter immediately', () => {
    cy.server();

    let initialCount = 0;
    cy.get('[data-testid=catalog-title')
      .invoke('text')
      .then((text) => {
        initialCount = parseInt(text.split(' ')[0]);
      });

    cy.route({
      method: 'GET',
      url: '**/products-vehicle**',
    }).as('applyFilter');

    cy.get('[data-testid=filter-button-SiteCatalogFilterToggle]')
      .last()
      .click();

    cy.wait('@applyFilter');

    cy.get('[data-testid=catalog-title')
      .invoke('text')
      .should((text) => {
        expect(parseInt(text.split(' ')[0])).to.be.lessThan(initialCount);
      });
  });
});
