import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/result",
    overwrite: false,
    hmtl: false,
    json: true
  }
});
