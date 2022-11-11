import React from "react";
import { mount } from "@cypress/react";
// import * as ReactDom from "react-dom";
// import { ColorScales } from "../../src/lib/components/ColorScales";

// import { mount } from "cypress/react";

describe("ComponentName.cy.ts", () => {
    it("playground", () => {
        // if (React) {
        //     cy.mount(<div id={"TestId"}>Test</div>);
        // }
        mount(<div id={"TestId"}>Test</div>);
        // mount(<div id={"TestId"}>Test</div>, { ReactDom });
        // mount(React.createElement("div", { id: "TestId" }, "Test"));
    });
});
