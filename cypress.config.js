const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://qauto.forstudy.space',
    viewportWidth: 1440,
    viewportHeight: 900,
    video: false,
    testIsolation: false,
  },
});