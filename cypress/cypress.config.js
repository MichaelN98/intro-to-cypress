const { defineConfig } = require('cypress');

module.exports = defineConfig({
    e2e: {
        baseUrl: 'https://example.cypress.io',
        viewportWidth: 1280,
        viewportHeight: 720,
        defaultCommandTimeout: 5000,
        video: false,
        screenshotsFolder: 'cypress/screenshots',
        specPattern: 'cypress/e2e/**/*.cy.js',
        supportFile: 'cypress/support/e2e.js',
    },
});
