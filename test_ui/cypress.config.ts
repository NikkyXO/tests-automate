import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setupNodeEvents(on, config) {
    },
    baseUrl: 'http://localhost:5173'
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },
});
