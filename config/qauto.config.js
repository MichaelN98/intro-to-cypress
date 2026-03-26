const { defineConfig } = require('cypress');

module.exports = defineConfig({
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: true,
    json: true,
  },
  e2e: {
    baseUrl: 'https://qauto.forstudy.space',
    viewportWidth: 1440,
    viewportHeight: 900,
    video: false,
    supportFile: 'cypress/support/e2e.js',
    specPattern: 'cypress/e2e/**/*.cy.js',
  },
  env: {
    authUsername: 'guest',
    authPassword: 'welcome2qauto',
    userEmail: `mike+qauto${Date.now()}@test.com`,
    userPassword: 'Qwerty123',
  },
});
