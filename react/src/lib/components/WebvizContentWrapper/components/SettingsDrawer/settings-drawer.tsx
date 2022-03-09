import React from "react";
import useSize from "@react-hook/size";
import { settings, chevron_right, chevron_left } from "@equinor/eds-icons";
import { Icon } from "@equinor/eds-core-react";
Icon.add({ settings, chevron_right, chevron_left });

import { Button } from "@material-ui/core";

import { DrawerPosition } from "../../shared-types/drawer-position";

import { useStore } from "../ContentManager";
import { ViewSelector } from "./components/ViewSelector/view-selector";

import "./settings-drawer.css";
import { Settings } from "./components/Settings/settings";
import { PluginActions } from "./components/PluginActions/plugin-actions";

type Position = {
    left: number | "auto";
    top: number | "auto";
    right: number | "auto";
    bottom: number | "auto";
};

export const SettingsDrawer: React.FC = () => {
    const [open, setOpen] = React.useState<boolean>(false);
    const [position, setPosition] = React.useState<Position>({
        left: "auto",
        top: "auto",
        right: "auto",
        bottom: "auto",
    });
    const store = useStore();
    const drawerRef = React.useRef<HTMLDivElement>(null);
    const drawerSize = useSize(drawerRef);
    const [oldDrawerSize, setOldDrawerSize] = React.useState<number>(0);
    const expandedWidth = 300;
    const collapsedWidth = 64;

    React.useLayoutEffect(() => {
        let top: "auto" | number = 0;
        let bottom: "auto" | number = "auto";
        let left: "auto" | number = "auto";
        let right: "auto" | number = "auto";

        if (store.state.bodyMargins.top > 16) {
            top = store.state.bodyMargins.top - 50;
        } else if (store.state.bodyMargins.bottom > 16) {
            top = "auto";
            bottom = store.state.bodyMargins.bottom - 50;
        }
        if (store.state.position === DrawerPosition.Left) {
            left = Math.max(store.state.bodyMargins.left - 50, 0);
        } else if (store.state.position === DrawerPosition.Right) {
            right = Math.max(store.state.bodyMargins.right - 50, 0);
        }
        setPosition({
            left: left,
            top: top,
            right: right,
            bottom: bottom,
        });
    }, [store.state.bodyMargins, store.state.position]);

    React.useLayoutEffect(() => {
        const bodyMargins = { ...store.state.bodyMargins };
        if (store.state.position === DrawerPosition.Left) {
            bodyMargins.left = bodyMargins.left + drawerSize[0];
        } else if (store.state.position === DrawerPosition.Right) {
            bodyMargins.right = bodyMargins.right + drawerSize[0];
        }
        document.body.style.marginLeft = bodyMargins.left + "px";
        document.body.style.marginRight = bodyMargins.right + "px";
        setOldDrawerSize(drawerSize[0]);
    }, [
        drawerSize,
        store.state.position,
        store.state.bodyMargins,
        oldDrawerSize,
    ]);

    return (
        <div
            ref={drawerRef}
            className={`WebvizSettingsDrawer WebvizSettingsDrawer__${
                store.state.position.charAt(0).toUpperCase() +
                store.state.position.slice(1)
            }`}
            style={{
                width: open ? expandedWidth : collapsedWidth,
                left: position.left,
                top: position.top,
                right: position.right,
                bottom: position.bottom,
                height: `calc(100vh - ${
                    position.top !== "auto"
                        ? position.top
                        : position.bottom !== "auto"
                        ? position.bottom
                        : 0
                }px)`,
            }}
        >
            <div className="WebvizSettingsDrawer__TopButtons">
                <Button
                    className={`WebvizSettingsDrawer__Toggle ${
                        !open
                            ? "WebvizSettingsDrawer__ToggleOpen"
                            : "WebvizSettingsDrawer__ToggleClose"
                    }`}
                    onClick={() => setOpen(!open)}
                >
                    <Icon name="chevron_left" />
                    <Icon name="settings" />
                </Button>
            </div>
            <ViewSelector open={open} width={expandedWidth} />
            <Settings visible={open} />
            <PluginActions open={open} />
        </div>
    );
};
