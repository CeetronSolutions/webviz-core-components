import React from "react";
import { mount } from "@cypress/react";

import { SmartNodeSelector } from "../../src/lib";

describe("SmartNodeSelector.cy.ts", () => {
    it("playground", () => {
        mount(
            <SmartNodeSelector
                id="test"
                data={[]}
                setProps={() => {
                    return;
                }}
            />
        );
    });
});
