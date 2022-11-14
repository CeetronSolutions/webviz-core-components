import webpackConfig from "./webpack.config";
import { defineConfig } from "cypress";

export default defineConfig({
    component: {
        devServer: {
            framework: "react",
            bundler: "webpack",
            webpackConfig: webpackConfig,
        },
    },
});
