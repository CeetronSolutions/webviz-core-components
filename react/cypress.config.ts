import { defineConfig } from "cypress";
import webpackConfig from "./webpack.config";

export default defineConfig({
    // These settings apply everywhere unless overridden
    defaultCommandTimeout: 5000,

    viewportWidth: 1200,
    viewportHeight: 800,

    component: {
        devServer: {
            framework: "react",
            bundler: "webpack",
            webpackConfig,
        },
        specPattern: "cypress/**/*.cy.{js,jsx,ts,tsx}",
    },
});
