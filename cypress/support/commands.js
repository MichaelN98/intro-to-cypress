Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
    if (options && options.sensitive) {
        options.log = false;

        Cypress.log({
            $el: element,
            name: 'type',
            message: '*'.repeat(text.length),
        });
    }

    return originalFn(element, text, options);
});

Cypress.Commands.add('login', (email, password) => {
    cy.visit('/', {
        auth: {
            username: 'guest',
            password: 'welcome2qauto',
        },
    });

    cy.contains('button', 'Sign In').click();

    cy.contains('.modal-title', 'Log in')
        .should('be.visible')
        .parents('.modal-content')
        .within(() => {
            cy.get('input[name="email"]').should('be.visible').clear().type(email);
            cy.get('input[name="password"]').should('be.visible').clear().type(password, { sensitive: true });
            cy.contains('button', 'Login').should('not.be.disabled').click();
        });
});