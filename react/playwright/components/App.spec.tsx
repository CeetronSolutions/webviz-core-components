import { test, expect } from "@playwright/experimental-ct-react";
import React from "react";
import App from "../../src/demo/App";

test.use({ viewport: { width: 500, height: 500 } });

test("should work", async ({ mount }) => {
    const component = await mount(<App />);
    await expect(component).toContainText("Learn React");
});
