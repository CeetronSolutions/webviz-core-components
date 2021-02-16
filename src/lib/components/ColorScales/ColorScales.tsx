// Adapted from https://github.com/plotly/dash-colorscales

import React, { useState } from "react";
import PropTypes from "prop-types";

import ColorscalePicker, { Colorscale } from "react-colorscales";

// Use "Viridis" as the default scale
const DEFAULT_SCALE = [
    "#fafa6e",
    "#9cdf7c",
    "#4abd8c",
    "#00968e",
    "#106e7c",
    "#2a4858",
];

type ColorScalesType = {
    id: string,
    setProps?: (props: object) => void,
    initialColorScale?: Array<string>,
    numSwatches?: number,
    fixSwatches?: boolean
}

/**
 * ColorScales is a Dash wrapper for `react-colorscales`.
 * It takes an array of colors, `colorscale`, and
 * displays a UI for modifying it or choosing a new scale.
 */
const ColorScales: React.FC<ColorScalesType> = ({ id, setProps, initialColorScale, numSwatches, fixSwatches }) => {
    const [showColorScalePicker, setShowColorScalePicker] = useState(false);
    const [colorScale, setColorScale] = useState(initialColorScale || DEFAULT_SCALE);

    return (
        <div id={id}>
            <div
                onClick={() =>
                    setShowColorScalePicker(!showColorScalePicker)
                }
            >
                <Colorscale
                    colorscale={colorScale}
                    onClick={() => { }}
                    width={150}
                />
            </div>
            {showColorScalePicker && (
                <ColorscalePicker
                    colorscale={colorScale || DEFAULT_SCALE}
                    nSwatches={numSwatches || DEFAULT_SCALE.length}
                    fixSwatches={fixSwatches}
                    onChange={newColorScale => {
                        /*
                         * Send the new value to the parent component.
                         * In a Dash app, this will send the data back to the
                         * Python Dash app server.
                         */
                        if (setProps) {
                            setProps({
                                colorscale: newColorScale,
                            });
                        }
                        setColorScale(newColorScale);
                    }}
                />
            )}
        </div>
    );
};

export default ColorScalesType;

ColorScales.propTypes = {
    /**
     * The ID used to identify this component in Dash callbacks
     */
    id: PropTypes.string.isRequired,

    /**
     * Optional: Initial colorscale to display. Default is Viridis.
     */
    initialColorScale: PropTypes.array,

    /**
     * Optional: Initial number of colors in scale to display.
     */
    numSwatches: PropTypes.number,

    /**
     * Optional: Set to `True` to fix the number of colors in the scale.
     */
    fixSwatches: PropTypes.bool,

    /**
     * Dash-assigned callback that should be called whenever any of the
     * properties change
     */
    setProps: PropTypes.func,
};
