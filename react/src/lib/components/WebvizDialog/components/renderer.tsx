import React from "react";
import * as ReactDOM from "react-dom";

type RendererProps = {
    target: Element | DocumentFragment | null;
    children?: React.ReactNode;
    open?: boolean;
};

export const Renderer = React.forwardRef<HTMLDivElement, RendererProps>(
    (props, ref) => {
        return props.target ? (
            ReactDOM.createPortal(
                <div
                    ref={ref}
                    style={{ display: props.open ? "block" : "none" }}
                >
                    {props.children}
                </div>,
                props.target
            )
        ) : (
            <div></div>
        );
    }
);
