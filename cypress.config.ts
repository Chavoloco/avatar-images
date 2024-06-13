import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
    specPattern: 'src/com/solvd/pages/**/*.cy.{js,jsx,ts,tsx}',
  },
  reporter: "reporters/custom.js",
  reporterOptions: {
    reportDir: "cypress/result",
    overwrite: false,
    hmtl: false,
    json: true
  }
});
