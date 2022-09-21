import React from "react";
import PropTypes from "prop-types";

import { IconButton } from "@material-ui/core";

import "./webviz-dialog-title.css";

import { Icon } from "@equinor/eds-core-react";
import { close } from "@equinor/eds-icons";

Icon.add({ close });

export type WebvizDialogTitleProps = {
    id?: string;
    children?: React.ReactNode;
    onClose?: () => void;
};

export const WebvizDialogTitle = React.forwardRef<
    HTMLDivElement,
    WebvizDialogTitleProps
>((props, ref) => {
    const handleCloseClick = React.useCallback(() => {
        if (props.onClose) {
            props.onClose();
        }
    }, [props.onClose]);

    return (
        <div className="WebvizDialogTitle" id={props.id} ref={ref}>
            {props.children}
            {props.onClose && (
                <IconButton
                    aria-label="close"
                    onClick={() => handleCloseClick()}
                    style={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        // color: "#ccc",
                    }}
                >
                    <Icon name="close" />
                </IconButton>
            )}
        </div>
    );
});

WebvizDialogTitle.propTypes = {
    id: PropTypes.string,
    children: PropTypes.node,
    onClose: PropTypes.func,
};
