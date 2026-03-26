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

Cypress.Commands.add('visitApp', () => {
  cy.visit('/', {
    auth: {
      username: Cypress.env('authUsername'),
      password: Cypress.env('authPassword'),
    },
  });
});

Cypress.Commands.add('login', (email, password) => {
  cy.visitApp();

  cy.contains('button', 'Sign In').click();

  cy.contains('.modal-title', 'Log in')
    .should('be.visible')
    .parents('.modal-content')
    .within(() => {
      cy.get('input[name="email"]').clear().type(email);
      cy.get('input[name="password"]').clear().type(password, { sensitive: true });
      cy.contains('button', 'Login').click();
    });

  cy.url().should('include', '/panel/garage');
});

Cypress.Commands.add('register', (email, password) => {
  cy.visitApp();

  cy.contains('button', 'Sign up').click();

  cy.contains('.modal-title', 'Registration')
    .should('be.visible')
    .parents('.modal-content')
    .within(() => {
      cy.get('#signupName').clear().type('John');
      cy.get('#signupLastName').clear().type('Doe');
      cy.get('#signupEmail').clear().type(email);
      cy.get('#signupPassword').clear().type(password, { sensitive: true });
      cy.get('#signupRepeatPassword').clear().type(password, { sensitive: true });
      cy.contains('button', 'Register').should('not.be.disabled').click();
    });
});