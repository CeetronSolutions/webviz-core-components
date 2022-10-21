import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import {
    DialogComponent as Dialog,
    DialogProps,
} from "./components/DialogComponent";
import { Button } from "@material-ui/core";

export default {
    title: "Components/Dialog",
    component: Dialog,
    argTypes: {
        actions: { control: "array" },
    },
} as ComponentMeta<typeof Dialog>;

const Template: ComponentStory<typeof Dialog> = (args: DialogProps) => {
    const { open, ...other } = args;
    const [dialogOpen, setDialogOpen] = React.useState<boolean>(open || false);
    return (
        <>
            <Button variant="outlined" onClick={() => setDialogOpen(true)}>
                Open dialog
            </Button>
            <Dialog
                {...other}
                open={dialogOpen}
                setProps={(newProps) => setDialogOpen(newProps.open)}
            >
                {other.backdrop
                    ? "This is a short body text"
                    : "This is a modal dialog. Closes when clicking on backdrop. And this text is very long to verify maxHeight of the component which is hopefully finished within the next hundreds of weeks since I'm a bit tired of only working on this"}
            </Dialog>
        </>
    );
};

export const Basic = Template.bind({});
Basic.args = {
    id: "Dialog",
    title: "My Dialog",
    // backdrop: Dialog.defaultProps?.backdrop || false,
    open: Dialog.defaultProps?.open || false,
    max_width: Dialog.defaultProps?.max_width || "md",
    full_screen: Dialog.defaultProps?.full_screen || false,
    draggable: Dialog.defaultProps?.draggable || false,
    children: [],
    actions: Dialog.defaultProps?.actions || [],
};
