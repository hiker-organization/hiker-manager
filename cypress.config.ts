import { defineConfig } from 'cypress'
import dotenv from 'dotenv'

dotenv.config()

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  env: {
    API_URL: process.env.VITE_API_URL,
    AUTH_EMAIL: process.env.CYPRESS_AUTH_EMAIL,
    AUTH_PASSWORD: process.env.CYPRESS_AUTH_PASSWORD,
  },

  expose: {
    APP_URL: process.env.VITE_APP_URL,
  }
});
