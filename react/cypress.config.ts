import { defineConfig } from "cypress";

export default defineConfig({
    // These settings apply everywhere unless overridden
    defaultCommandTimeout: 5000,

    viewportWidth: 1200,
    viewportHeight: 800,

    component: {
        devServer: {
            framework: "react",
            bundler: "webpack",
        },
        specPattern: "cypress/**/*.cy.{js,jsx,ts,tsx}",
    },
});
