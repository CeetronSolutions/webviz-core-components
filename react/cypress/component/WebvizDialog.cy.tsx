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

const nonModalWebvizDialog = (content: React.ReactNode, actions?: string[]) => {
    return (
        <WebvizDialog
            id={"WebvizDialog"}
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
    it("renders", () => {
        const wrapper = cy.mount(nonModalWebvizDialog(dialogTestContent()));
        // const wrapper = cy.mount(<EdsIcon icon={"star"} />);
        // const wrapper = cy.mount(<SmartNodeSelector data={[]} id={"TestId"} />);
        // const wrapper = mount(<Backdrop opacity={1} />);
        wrapper.should("exist");
    });
});
