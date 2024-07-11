// cypress.config.js
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Implementar los listeners de eventos aquí
    },
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    experimentalRunAllSpecs: true, // Habilitar la característica experimental
    baseUrl: "http://localhost:4200",
    screenshotOnRunFailure: false, // Desactivar capturas de pantalla en fallos
    video: false, // Desactivar grabación de videos
  }
});
