import React from "react";
import { mount } from "enzyme";
import { render } from "@testing-library/react";
import { afterEach, describe, expect, test } from "@jest/globals";
// import "@testing-library/jest-dom";

import { WebvizRenderer } from "../../src/lib/components/WebvizDialog/components/WebvizRenderer";
import { WebvizDialog } from "../../src/lib";
import { WebvizDialogParentProps } from "../../src/lib/components/WebvizDialog/WebvizDialog";

let parentProps: WebvizDialogParentProps = {
    open: false,
    actions_called: undefined,
    last_action_called: undefined,
};

const GLOBAL_INNER_WIDTH = 1024;
const GLOBAL_INNER_HEIGHT = 768;

const clearParentProps = () => {
    parentProps = {
        open: false,
        actions_called: undefined,
        last_action_called: undefined,
    };
};

const setProps = (props: WebvizDialogParentProps): void => {
    parentProps = { ...props };
};

const nonModalWebvizDialog = (
    contentWidth: number,
    contentHeight: number,
    actions?: string[]
) => {
    return (
        <WebvizDialog
            id={"WebvizDialog"}
            title={"WebvizDialog Title"}
            open={true}
            modal={false}
            actions={actions}
            setProps={setProps}
        >
            <div style={{ width: contentWidth, height: contentHeight }}>
                This is the content of test dialog
            </div>
        </WebvizDialog>
    );
};

const modalWebvizDialog = (
    contentWidth: number,
    contentHeight: number,
    actions?: string[]
) => {
    return (
        <WebvizDialog
            id={"WebvizDialog"}
            title={"WebvizDialog Title"}
            open={true}
            modal={true}
            actions={actions}
            setProps={setProps}
        >
            <div style={{ width: contentWidth, height: contentHeight }}>
                This is the content of test dialog
            </div>
        </WebvizDialog>
    );
};

describe("WebvizDialog", () => {
    afterEach(() => {
        clearParentProps();
    });

    test("Render single non-modal dialog Snapshot", () => {
        const contentWidth = 400;
        const contentHeight = 200;
        const { baseElement } = render(
            nonModalWebvizDialog(contentWidth, contentHeight)
        );

        expect(baseElement).toMatchSnapshot();
    });

    test("Render single non-modal dialog", () => {
        const contentWidth = 400;
        const contentHeight = 200;
        const component = mount(
            nonModalWebvizDialog(contentWidth, contentHeight)
        );

        expect(
            component.find(".WebvizDialog.WebvizDialog--active")
        ).toHaveLength(1);
        expect(component.find(".Webviz__Backdrop")).toHaveLength(0);
        expect(component.find(".WebvizDialogTitle")).toHaveLength(1);
        expect(component.find(".WebvizDialogContent")).toHaveLength(1);
        expect(component.find(".WebvizDialogActions")).toHaveLength(1);
        expect(component.find(".WebvizDialogActions").children()).toHaveLength(
            0
        );

        component.unmount();
    });

    test("Render single modal dialog", () => {
        const contentWidth = 400;
        const contentHeight = 200;
        const component = mount(modalWebvizDialog(contentWidth, contentHeight));

        expect(
            component.find(
                ".WebvizDialog.WebvizDialog--modal.WebvizDialog--active"
            )
        ).toHaveLength(1);
        expect(component.find(".Webviz__Backdrop")).toHaveLength(1);
        expect(component.find(".WebvizDialogTitle")).toHaveLength(1);
        expect(component.find(".WebvizDialogContent")).toHaveLength(1);
        expect(component.find(".WebvizDialogActions")).toHaveLength(1);
        expect(component.find(".WebvizDialogActions").children()).toHaveLength(
            0
        );

        component.unmount();
    });

    test("Click actions button", () => {
        const contentWidth = 400;
        const contentHeight = 200;
        const component = mount(
            nonModalWebvizDialog(contentWidth, contentHeight, ["ok", "cancel"])
        );

        expect(component.find(".WebvizDialogActions").children()).toHaveLength(
            2
        );

        const okButton = component
            .find(".WebvizDialogActions")
            .children()
            .at(0);
        const cancelButton = component
            .find(".WebvizDialogActions")
            .children()
            .at(1);

        okButton.simulate("click");
        expect(parentProps.actions_called).toEqual(1);
        expect(parentProps.last_action_called).toEqual("ok");

        cancelButton.simulate("click");
        expect(parentProps.actions_called).toEqual(2);
        expect(parentProps.last_action_called).toEqual("cancel");

        okButton.simulate("click");
        expect(parentProps.actions_called).toEqual(3);
        expect(parentProps.last_action_called).toEqual("ok");

        component.unmount();
    });

    test("Modal dialog backdrop click", () => {
        const contentWidth = 400;
        const contentHeight = 200;
        const component = mount(modalWebvizDialog(contentWidth, contentHeight));

        expect(component.find(WebvizRenderer)).toHaveLength(1);
        expect(component.find({ "aria-label": "WebvizRenderer" })).toHaveLength(
            1
        );
        expect(component.find(".Webviz__Backdrop")).toHaveLength(1);

        expect(component.find(WebvizRenderer).prop("open")).toBeTruthy();
        expect(
            component
                .find({ "aria-label": "WebvizRenderer" })
                .first()
                .prop("style")
        ).toHaveProperty("display", "block");

        // Simulate backdrop click
        component.find(".Webviz__Backdrop").simulate("click");

        expect(component.find(WebvizRenderer).prop("open")).toBeFalsy();
        expect(
            component.find({ "aria-label": "WebvizRenderer" }).prop("style")
        ).toHaveProperty("display", "none");

        component.unmount();
    });
});
