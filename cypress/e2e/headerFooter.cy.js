describe('QAuto header and footer queries', () => {
    beforeEach(() => {
        cy.visit('/', {
            auth: {
                username: 'guest',
                password: 'welcome2qauto',
            },
        });
    });

    it('finds all header elements', () => {
        cy.get('header').within(() => {
            cy.contains('a', 'Home').should('be.visible');
            cy.contains('button', 'About').should('be.visible');
            cy.contains('button', 'Contacts').should('be.visible');
            cy.contains('button', 'Guest log in').should('be.visible');
            cy.contains('button', 'Sign In').should('be.visible');
        });
    });

    it('finds Sign up button', () => {
        cy.contains('button', 'Sign up').should('be.visible');
    });

    it('finds footer social links', () => {
        cy.get('#contactsSection').within(() => {
            cy.get('.socials_link').should('have.length', 5);
        });
    });

    it('finds footer website and email', () => {
        cy.get('#contactsSection').within(() => {
            cy.contains('a', 'ithillel.ua').should('be.visible');
            cy.contains('a', 'support@ithillel.ua').should('be.visible');
        });
    });
});