/**
 * Copyright (c) 2021- Equinor ASA
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import PropTypes, { InferProps } from "prop-types";
import { isEqual } from "lodash";

import {
    getPropsWithMissingValuesSetToDefault,
    Optionals,
} from "../../utils/DefaultPropsHelpers";
import "./Select.css";

const propTypes = {
    /**
     * The ID used to identify this component in Dash callbacks
     */
    id: PropTypes.string.isRequired,
    /**
     * The number of visible options
     */
    size: PropTypes.number,
    /**
     * An array of options {label: [string|number], value: [string|number]},
     * an optional disabled field can be used for each option
     */
    options: PropTypes.arrayOf(
        PropTypes.exact({
            /**
             * The dropdown's label
             */
            label: PropTypes.oneOfType([
                PropTypes.string.isRequired,
                PropTypes.number.isRequired,
            ]).isRequired,

            /**
             * The value of the dropdown. This value
             * corresponds to the items specified in the
             * `value` property.
             */
            value: PropTypes.oneOfType([
                PropTypes.string.isRequired,
                PropTypes.number.isRequired,
            ]).isRequired,
        }).isRequired
    ),
    /**
     * The value of the input. If `multi` is false
     * then value is just a string that corresponds to the values
     * provided in the `options` property. If `multi` is true, then
     * multiple values can be selected at once, and `value` is an
     * array of items with values corresponding to those in the
     * `options` prop.
     */
    value: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.number.isRequired,
        PropTypes.arrayOf(
            PropTypes.oneOfType([
                PropTypes.string.isRequired,
                PropTypes.number.isRequired,
            ]).isRequired
        ).isRequired,
    ]),
    /**
     * Debounce time for props update for user. The value prop for selected
     * values for Dash callbacks are debounced with the configured number
     * of milliseconds.
     */
    debounce_time_ms: PropTypes.number,
    /**
     * If true, the user can select multiple values
     */
    multi: PropTypes.bool,
    /**
     * Appends a class to the select tag
     */
    className: PropTypes.string,
    /**
     * Appends styles to the select tag
     */
    style: PropTypes.object,
    /**
     * Appends a class to the wrapping div
     */
    parent_className: PropTypes.string,
    /**
     * Appends inline styles to the wrapping div
     */
    parent_style: PropTypes.object,
    /**
     * Dash-assigned callback that gets fired when the input changes
     */
    setProps: PropTypes.func,
    /**
     * Used to allow user interactions in this component to be persisted when
     * the component - or the page - is refreshed. If `persisted` is truthy and
     * hasn't changed from its previous value, a `value` that the user has
     * changed while using the app will keep that change, as long as
     * the new `value` also matches what was given originally.
     * Used in conjunction with `persistence_type`.
     */
    persistence: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.string,
        PropTypes.number,
    ]),

    /**
     * Properties whose user interactions will persist after refreshing the
     * component or the page. Since only `value` is allowed this prop can
     * normally be ignored.
     */
    persisted_props: PropTypes.arrayOf(PropTypes.oneOf(["value"]).isRequired),

    /**
     * Where persisted user changes will be stored:
     * memory: only kept in memory, reset on page refresh.
     * local: window.localStorage, data is kept after the browser quit.
     * session: window.sessionStorage, data is cleared once the browser quit.
     */
    persistence_type: PropTypes.oneOf(["local", "session", "memory"]),
};

const defaultProps: Optionals<InferProps<typeof propTypes>> = {
    options: [],
    size: 4,
    value: [],
    multi: true,
    debounce_time_ms: 0,
    style: {},
    parent_style: {},
    className: "",
    parent_className: "",
    persistence: false,
    persisted_props: ["value"],
    persistence_type: "local",
    setProps: (): void => {
        return;
    },
};

/**
 * Select is a dash wrapper for the html select tag.
 */
export const Select: React.FC<InferProps<typeof propTypes>> = (
    props: InferProps<typeof propTypes>
): JSX.Element => {
    const {
        id,
        parent_className,
        parent_style,
        value,
        multi,
        debounce_time_ms,
        size,
        className,
        style,
        options,
        setProps,
    } = getPropsWithMissingValuesSetToDefault(props, defaultProps);

    const [selectedValues, setSelectedValues] =
        React.useState<string | number | (string | number)[]>(value);

    const debounceTimer =
        React.useRef<ReturnType<typeof setTimeout> | null>(null);

    React.useEffect(() => {
        if (!isEqual(value, selectedValues)) {
            setSelectedValues(value);
        }
    }, [value]);

    React.useEffect(() => {
        return () => {
            debounceTimer.current && clearTimeout(debounceTimer.current);
        };
    }, []);

    const handleChange = React.useCallback(
        (e: React.ChangeEvent) => {
            const selectedOptions = [].slice.call(
                (e.target as HTMLSelectElement).selectedOptions
            );
            const values = options
                .filter((option) =>
                    selectedOptions.some(
                        (selectedOption: HTMLOptionElement) =>
                            selectedOption.value === option.value.toString()
                    )
                )
                .map((option) => option.value);

            if (!isEqual(values, selectedValues)) {
                setSelectedValues(values);
            }

            debounceTimer.current && clearTimeout(debounceTimer.current);
            debounceTimer.current = setTimeout(() => {
                setProps({ value: values });
            }, debounce_time_ms);
        },
        [
            debounceTimer.current,
            debounce_time_ms,
            options,
            selectedValues,
            setProps,
        ]
    );

    return (
        <div
            id={id}
            className={parent_className ? parent_className : ""}
            style={parent_style ? parent_style : {}}
        >
            <select
                value={
                    selectedValues
                        ? typeof selectedValues === "string" ||
                          typeof selectedValues === "number"
                            ? selectedValues
                            : (selectedValues as (string | number)[]).map(
                                  (el) => el.toString()
                              )
                        : ""
                }
                multiple={multi}
                size={size}
                onChange={(e) => handleChange(e)}
                className={"webviz-config-select " + className}
                style={style}
            >
                {options.map((opt, idx) => {
                    return (
                        <option
                            key={idx.toString() + opt.value}
                            value={opt.value}
                        >
                            {opt.label}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};

Select.defaultProps = defaultProps;

Select.propTypes = propTypes;
