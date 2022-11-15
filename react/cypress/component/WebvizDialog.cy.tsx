import { first } from "lodash";
import React from "react";

// import { EdsIcon } from "../../src/lib";
// import { SmartNodeSelector } from "../../src/lib/components/SmartNodeSelector";
// import { Backdrop } from "../../src/lib/components/Backdrop";

import { WebvizDialog } from "../../src/lib";
import { WebvizDialogParentProps } from "../../src/lib/components/WebvizDialog/WebvizDialog";

let parentProps: WebvizDialogParentProps = {
    open: false,
    actions_called: undefined,
    last_action_called: undefined,
};

const setProps = (props: WebvizDialogParentProps): void => {
    parentProps = { ...props };
};

const nonModalWebvizDialog = (
    id: string,
    content: React.ReactNode,
    actions?: string[]
) => {
    return (
        <WebvizDialog
            id={id}
            title={"WebvizDialog Title"}
            open={true}
            modal={false}
            actions={actions}
            setProps={setProps}
        >
            {content}
        </WebvizDialog>
    );
};

const modalWebvizDialog = (content: React.ReactNode, actions?: string[]) => {
    return (
        <WebvizDialog
            id={"WebvizDialog"}
            title={"WebvizDialog Title"}
            open={true}
            modal={true}
            actions={actions}
            setProps={setProps}
        >
            {content}
        </WebvizDialog>
    );
};

const dialogTestContent = (
    contentWidth = 400,
    contentHeight = 200
): React.ReactNode => {
    return (
        <div style={{ width: contentWidth, height: contentHeight }}>
            This is the content of test dialog
        </div>
    );
};

describe("WebvizDialog", () => {
    beforeEach(() => {
        cy.viewport(1200, 800);
    });
    // it("Render non-modal dialog", () => {
    //     const wrapper = cy.mount(
    //         nonModalWebvizDialog("WebvizDialogId", dialogTestContent())
    //     );

    //     wrapper.should("exist");
    //     wrapper.get(".WebvizDialog").should("exist");
    //     wrapper.get(".WebvizDialog--active").should("exist");
    //     wrapper.get(".WebvizDialog--modal").should("not.exist");
    // });

    // it("Resize window to 400x300", () => {
    //     const wrapper = cy.mount(
    //         nonModalWebvizDialog("WebvizDialogId", dialogTestContent())
    //     );

    //     // Adjust window size to 400x300
    //     cy.viewport(400, 300);

    //     // Verify position and width adjustments
    //     wrapper.get(".WebvizDialog").should("have.css", "left", "16px");
    //     wrapper.get(".WebvizDialog").should("have.css", "top", "16px");
    //     wrapper.get(".WebvizDialog").should("have.css", "width", "368px");
    // });

    it("Drag non-modal dialog", () => {
        const wrapper = cy.mount(
            nonModalWebvizDialog("WebvizDialogId", dialogTestContent())
        );

        // Drag dialog to new position
        wrapper
            .get(".WebvizDialogTitle")
            .trigger("mousemove", "top", { force: true })
            .trigger("mousedown", "top", { which: 1, force: true })
            .trigger("mousemove", -100, -100, { force: true })
            .trigger("mouseup", -100, -100, { which: 1, force: true });
    });

    // it("Render two non-modal dialogs", () => {
    //     const wrapper = cy.mount(
    //         <>
    //             <WebvizDialog
    //                 id={"FirstDialogId"}
    //                 title={"First WebvizDialog Title"}
    //                 open={true}
    //                 modal={false}
    //                 setProps={setProps}
    //             >
    //                 <div style={{ width: 500, height: 300 }} />
    //             </WebvizDialog>
    //             <WebvizDialog
    //                 id={"SecondDialogId"}
    //                 title={"Second WebvizDialog Title"}
    //                 open={true}
    //                 modal={false}
    //                 setProps={setProps}
    //             ></WebvizDialog>
    //         </>
    //     );

    //     const firstDialog = wrapper.get("#FirstDialogId");
    //     const secondDialog = wrapper.get("#SecondDialogId");

    //     wrapper.get("#FirstDialogId").within(() => {
    //         wrapper.get("#FirstDialogId").should("have.class", "WebvizDialog");
    //         wrapper
    //             .get("#FirstDialogId")
    //             .should("not.have.class", "WebvizDialog--active");
    //         wrapper
    //             .get("#FirstDialogId")
    //             .should("not.have.class", "WebvizDialog--modal");
    //     });
    //     secondDialog.within(() => {
    //         secondDialog.should("have.class", "WebvizDialog");
    //         secondDialog.should("have.class", "WebvizDialog--active");
    //         secondDialog.should("not.have.class", "WebvizDialog--modal");
    //     });

    //     // secondDialog
    //     //     .trigger("mousedown")
    //     //     .trigger("mousemove", 100, 100)
    //     //     .trigger("mouseup", 100, 100);

    //     // secondDialog
    //     //     .trigger("mousedown", 460, 340, { force: true })
    //     //     .trigger("mousemove", 460, 340, { force: true })
    //     //     .trigger("mousemove", 200, 200, { force: true })
    //     //     .trigger("mouseup", 200, 200, { force: true });

    //     firstDialog.should("exist");
    //     firstDialog
    //         .get(".WebvizDialog")
    //         .should("have.class", "WebvizDialog--active");
    //     firstDialog.get(".WebvizDialog").should("have.class", "WebvizDialog");
    //     // firstDialog.trigger("click");
    //     // firstDialog.get(".WebvizDialog--active").should("exist");
    //     // firstDialog.find(".WebvizDialog--modal").should("not.exist");
    //     // expect(firstDialog.find(".WebvizDialog--modal")).to.not.exist;

    //     secondDialog.should("exist");
    //     secondDialog.get(".WebvizDialog").should("exist");
    //     secondDialog.get(".WebvizDialog--active").should("exist");
    //     secondDialog.get(".WebvizDialog--modal").should("not.exist");
    // });

    // it("Render modal dialog", () => {
    //     const wrapper = cy.mount(modalWebvizDialog(dialogTestContent()));

    //     wrapper.should("exist");
    //     wrapper.get(".WebvizDialog").should("exist");
    //     wrapper.get(".WebvizDialog--active").should("exist");
    //     wrapper.get(".WebvizDialog--modal").should("exist");
    // });
});
