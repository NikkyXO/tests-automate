import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://qa-test-9di7.onrender.com',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setupNodeEvents(on, config) {},
    env: {
      apiUrl: 'https://qa-test-9di7.onrender.com',
      baseUrl: 'https://qa-test-9di7.onrender.com',
    },
  },
});
