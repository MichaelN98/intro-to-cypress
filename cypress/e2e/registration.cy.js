describe('Registration functionality', () => {
    const password = 'Qwerty123';
    let email;

    const visitApp = () => {
        cy.visit('/', {
            auth: {
                username: 'guest',
                password: 'welcome2qauto',
            },
        });
    };

    const openRegistrationModal = () => {
        cy.contains('button', 'Sign up').click();
        cy.contains('.modal-title', 'Registration').should('be.visible');
    };

    const getRegistrationModal = () => {
        return cy.contains('.modal-title', 'Registration').parents('.modal-content');
    };

    const fillRegistrationForm = ({
        name = 'John',
        lastName = 'Doe',
        userEmail = email,
        userPassword = password,
        repeatPassword = password,
    } = {}) => {
        getRegistrationModal().within(() => {
            cy.get('#signupName').clear().type(name);
            cy.get('#signupLastName').clear().type(lastName);
            cy.get('#signupEmail').clear().type(userEmail);
            cy.get('#signupPassword').clear().type(userPassword, { sensitive: true });
            cy.get('#signupRepeatPassword').clear().type(repeatPassword, { sensitive: true });
        });
    };

    beforeEach(() => {
        email = `mike+${Date.now()}@test.com`;
        visitApp();
        openRegistrationModal();
    });

    it('should show registration modal with all fields', () => {
        getRegistrationModal().within(() => {
            cy.contains('Registration').should('be.visible');
            cy.get('#signupName').should('be.visible');
            cy.get('#signupLastName').should('be.visible');
            cy.get('#signupEmail').should('be.visible');
            cy.get('#signupPassword').should('be.visible');
            cy.get('#signupRepeatPassword').should('be.visible');
            cy.contains('button', 'Register').should('be.disabled');
        });
    });

    it('should validate Name field', () => {
        getRegistrationModal().within(() => {
            cy.get('#signupName').focus().blur();

            cy.get('#signupName')
                .parents('.form-group')
                .find('.invalid-feedback')
                .should('contain.text', 'Name required');

            cy.get('#signupName').should('have.class', 'is-invalid');

            cy.get('#signupName').clear().type('Іван').blur();

            cy.get('#signupName')
                .parents('.form-group')
                .find('.invalid-feedback')
                .should('contain.text', 'Name is invalid');

            cy.get('#signupName').should('have.class', 'is-invalid');

            cy.get('#signupName').clear().type('J').blur();

            cy.get('#signupName')
                .parents('.form-group')
                .find('.invalid-feedback')
                .should('contain.text', 'Name has to be from 2 to 20 characters long');

            cy.get('#signupName').should('have.class', 'is-invalid');

            cy.get('#signupName').clear().type('J'.repeat(21)).blur();

            cy.get('#signupName')
                .parents('.form-group')
                .find('.invalid-feedback')
                .should('contain.text', 'Name has to be from 2 to 20 characters long');

            cy.get('#signupName').should('have.class', 'is-invalid');

            cy.get('#signupName').clear().type('John').blur();
            cy.get('#signupName').should('not.have.class', 'is-invalid');
        });
    });

    it('should validate Last name field', () => {
        getRegistrationModal().within(() => {
            cy.get('#signupLastName').focus().blur();

            cy.get('#signupLastName')
                .parents('.form-group')
                .find('.invalid-feedback')
                .should('contain.text', 'Last name required');

            cy.get('#signupLastName').should('have.class', 'is-invalid');

            cy.get('#signupLastName').clear().type('Іванов').blur();

            cy.get('#signupLastName')
                .parents('.form-group')
                .find('.invalid-feedback')
                .should('contain.text', 'Last name is invalid');

            cy.get('#signupLastName').should('have.class', 'is-invalid');

            cy.get('#signupLastName').clear().type('D').blur();

            cy.get('#signupLastName')
                .parents('.form-group')
                .find('.invalid-feedback')
                .should('contain.text', 'Last name has to be from 2 to 20 characters long');

            cy.get('#signupLastName').should('have.class', 'is-invalid');

            cy.get('#signupLastName').clear().type('D'.repeat(21)).blur();

            cy.get('#signupLastName')
                .parents('.form-group')
                .find('.invalid-feedback')
                .should('contain.text', 'Last name has to be from 2 to 20 characters long');

            cy.get('#signupLastName').should('have.class', 'is-invalid');

            cy.get('#signupLastName').clear().type('Doe').blur();
            cy.get('#signupLastName').should('not.have.class', 'is-invalid');
        });
    });

    it('should validate Email field', () => {
        getRegistrationModal().within(() => {
            cy.get('#signupEmail').focus().blur();

            cy.get('#signupEmail')
                .parents('.form-group')
                .find('.invalid-feedback')
                .should('contain.text', 'Email required');

            cy.get('#signupEmail').should('have.class', 'is-invalid');

            cy.get('#signupEmail').clear().type('wrongemail').blur();

            cy.get('#signupEmail')
                .parents('.form-group')
                .find('.invalid-feedback')
                .should('contain.text', 'Email is incorrect');

            cy.get('#signupEmail').should('have.class', 'is-invalid');

            cy.get('#signupEmail').clear().type(email).blur();
            cy.get('#signupEmail').should('not.have.class', 'is-invalid');
        });
    });

    it('should validate Password field', () => {
        getRegistrationModal().within(() => {
            cy.get('#signupPassword').focus().blur();

            cy.get('#signupPassword')
                .parents('.form-group')
                .find('.invalid-feedback')
                .should('contain.text', 'Password required');

            cy.get('#signupPassword').should('have.class', 'is-invalid');

            cy.get('#signupPassword').clear().type('qwerty', { sensitive: true }).blur();

            cy.get('#signupPassword')
                .parents('.form-group')
                .find('.invalid-feedback')
                .should(
                    'contain.text',
                    'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
                );

            cy.get('#signupPassword').should('have.class', 'is-invalid');

            cy.get('#signupPassword').clear().type(password, { sensitive: true }).blur();
            cy.get('#signupPassword').should('not.have.class', 'is-invalid');
        });
    });

    it('should validate Re-enter password field', () => {
        getRegistrationModal().within(() => {
            cy.get('#signupRepeatPassword').focus().blur();

            cy.get('#signupRepeatPassword')
                .parents('.form-group')
                .find('.invalid-feedback')
                .should('contain.text', 'Re-enter password required');

            cy.get('#signupRepeatPassword').should('have.class', 'is-invalid');

            cy.get('#signupPassword').clear().type(password, { sensitive: true }).blur();
            cy.get('#signupPassword').should('not.have.class', 'is-invalid');

            cy.get('#signupRepeatPassword').clear().type('Qwerty124', { sensitive: true }).blur();

            cy.get('#signupRepeatPassword')
                .parents('.form-group')
                .find('.invalid-feedback')
                .should('contain.text', 'Passwords do not match');

            cy.get('#signupRepeatPassword').should('have.class', 'is-invalid');

            cy.get('#signupRepeatPassword').clear().type(password, { sensitive: true }).blur();
            cy.get('#signupRepeatPassword').should('not.have.class', 'is-invalid');
        });
    });

    it('should keep Register button disabled when form is invalid', () => {
        fillRegistrationForm({
            name: 'J',
            lastName: 'Doe',
            userEmail: email,
            userPassword: password,
            repeatPassword: password,
        });

        getRegistrationModal().within(() => {
            cy.contains('button', 'Register').should('be.disabled');
        });
    });

    it('should register a new user with valid data', () => {
        cy.intercept('POST', '**/api/auth/signup').as('signup');

        fillRegistrationForm({
            name: 'John',
            lastName: 'Doe',
            userEmail: email,
            userPassword: password,
            repeatPassword: password,
        });

        getRegistrationModal().within(() => {
            cy.get('#signupPassword').should('not.have.class', 'is-invalid');
            cy.get('#signupRepeatPassword').should('not.have.class', 'is-invalid');
            cy.contains('button', 'Register').should('not.be.disabled').click();
        });

        cy.wait('@signup').its('response.statusCode').should('eq', 201);
        cy.contains('.modal-title', 'Registration').should('not.exist');
    });

    it('should login with custom command after registration', () => {
        cy.intercept('POST', '**/api/auth/signup').as('signup');

        fillRegistrationForm({
            name: 'John',
            lastName: 'Doe',
            userEmail: email,
            userPassword: password,
            repeatPassword: password,
        });

        getRegistrationModal().within(() => {
            cy.get('#signupPassword').should('not.have.class', 'is-invalid');
            cy.get('#signupRepeatPassword').should('not.have.class', 'is-invalid');
            cy.contains('button', 'Register').should('not.be.disabled').click();
        });

        cy.wait('@signup').its('response.statusCode').should('eq', 201);

        cy.clearCookies();
        cy.clearLocalStorage();

        cy.intercept('POST', '**/api/auth/signin').as('signin');
        cy.login(email, password);

        cy.wait('@signin').its('response.statusCode').should('eq', 200);
        cy.contains('button', 'Sign In').should('not.exist');
    });
});