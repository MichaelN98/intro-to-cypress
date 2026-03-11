describe('Intro to Cypress', () => {
    it('opens example page', () => {
        cy.visit('/');
        cy.contains('Kitchen Sink').should('be.visible');
    });
});
