import React, { useState, useRef } from 'react';
import { useOnClickOutside } from 'hooks';
import { FormField } from '.';
import { ReactElement } from 'react';
import { classnames } from 'utils';
import { LinkWrapper } from 'components/LinkWrapper';

export const DisplayOption: React.FC<DisplayOptionProps> = ({
    click,
    value,
    multiSelect,
    option,
    field,
    displayField,
    toggle,
    setOutsideEscape
}) => {

    const Option = option;

    if (typeof option === 'function') return <li onClick={() => setOutsideEscape(false)}> <Option /> </li>;

    return (
        <LinkWrapper
            link={option.link}
            externalLink={option.externalLink}
        >

            <li
                onClick={() => { click && click(); toggle() }}
            >

                {multiSelect &&
                    <FormField
                        type="checkbox"
                        value={(value || []).includes(typeof option === "string" ? option : option[field])}
                    />
                }

                <span>
                    {typeof option === "string" ? option : option?.[displayField || "label"]}
                </span>

            </li>

        </LinkWrapper>
    )

}

interface DisplayOptionProps {
    click(): void,
    value: string | any[],
    multiSelect: boolean,
    option: string | ReactElement | any | { [key: string]: any, link?: string, externalLink?: string, label?: string },
    field: string,
    displayField: string,
    toggle(): void,
    setOutsideEscape(e: boolean): void
}


export const OptionsInput: React.FC<OptionsInputProp> = (
    { label, onChange, value, placeHolder, className, field, onClick = () => null, ...props }
) => {

    const [outsideEscape, setOutsideEscape] = useState(true);

    const [showOptions, setShowOptions] = useState(false);

    const ref: React.MutableRefObject<any> = useRef();

    const [searchValue, setSearchValue] = useState("");

    const searchProcess = (item: string | any): boolean => {

        let itemLabel = item === "string" ? item : item?.[props.displayField || "label" || ""];

        itemLabel = itemLabel || "";

        return itemLabel.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase());

    }

    useOnClickOutside(ref, () => !outsideEscape ? null : setShowOptions(false));

    const change = (val: string | number | any) => {

        if (typeof onChange !== "function") return;

        onChange(val);
    };

    const clickOption = (e: string | number | any) => {

        if (props.multiSelect) {
            e = e[field];
            const currentVal = Array.isArray(value) ? value : [];
            if (currentVal.includes(e)) {
                change(currentVal.filter(item => item !== e));
            } else change([...currentVal, e]);
            return;
        }

        change(e);

        setShowOptions(false);

    }

    const displayOutput = (placeholderStatus = false) => {

        let displayValue = { value: placeHolder || "choose", isDefault: true };

        if (value === undefined || value === null) {
            return placeholderStatus ? displayValue.isDefault : displayValue.value;
        };

        const display = (_val: string | { [key: string]: any }) => {

            if (typeof _val === "string") {
                return _val;
            }

            return _val[props.displayField || "label"];
        }

        if (props.multiSelect) {

            const valueFromArray = () => {

                if (Array.isArray(value)) {
                    if (value.length > 0) return { value: display(value[0]), isDefault: false };
                }

                return { value: placeHolder, isDefault: true };

            }

            displayValue = valueFromArray();


        } else {

            displayValue = { value: display(value) || placeHolder, isDefault: !value };

        }

        return placeholderStatus ? displayValue["isDefault"] : displayValue["value"];
    }

    const AddPlacement = props.addFunction;

    const Output = displayOutput();

    const placeHolderStatus = displayOutput(true);

    return (
        <div
            className={`form-field ${className}`}
        >

            {label && !props.isContextMenu &&
                <p
                    className="form-field-title context-menu-title"
                    tabIndex={props.isContextMenu ? 0 : 1}>
                    {label}
                </p>
            }

            <div
                className={`select ${(props.isContextMenu) ? 'withContextMenu' : ''}`}
                ref={ref}
            >

                <div
                    className="select-box"
                    onClick={() => (onClick(), setShowOptions(prevState => !prevState), setOutsideEscape(true))}
                    tabIndex={0}
                    onKeyDown={(e) => props.onKeyDown && props.onKeyDown(e)}
                >

                    {
                        !props.isContextMenu ?

                            <>
                                <div className={classnames('form-input', placeHolderStatus ? 'form-field-placeholder' : '')}>
                                    <span> {typeof Output === "function" ? <Output /> : Output} </span>
                                </div>
                                <i className="fa fa-chevron-down down-icon" aria-hidden="true" />
                            </>

                            :

                            <div className="_menu-selector">

                                {label &&

                                    <p
                                        className="form-field-title"
                                        tabIndex={0}>
                                        {label}
                                    </p>

                                }


                                <div className="select-box-context">
                                    <i className={props.ellipseIcon || "fas fa-ellipsis-h"} />
                                </div>

                            </div>
                    }


                </div>


                {
                    showOptions &&
                    <div className="select-pop">

                        {props.isSearchable &&
                            <FormField
                                className="select-pop-search"
                                placeHolder="Search Bank Name"
                                type="plain"
                                value={searchValue}
                                onChange={(e: string) => setSearchValue(e)} />}

                        <ul>

                            {(props?.options || [])
                                .filter((item: string | { [key: string]: any }) => props.isSearchable ? searchProcess(item) : true)
                                .map((item: string | React.FC | any | { [key: string]: any }, index: number) =>
                                    <React.Fragment
                                        key={`option-${index}`} >

                                        <DisplayOption
                                            click={() => clickOption(item)}
                                            option={item}
                                            value={value}
                                            multiSelect={props.multiSelect}
                                            field={field}
                                            displayField={props.displayField}
                                            toggle={() => setShowOptions(false)}
                                            setOutsideEscape={setOutsideEscape}
                                        />

                                    </React.Fragment>
                                )}

                            {AddPlacement &&
                                <>
                                    {typeof AddPlacement === 'function' ?
                                        <AddPlacement />
                                        :
                                        <li className="add-field">
                                            <i className="fa fa-plus" aria-hidden="true" />
                                            <span> {AddPlacement["name"]}  </span>
                                        </li>
                                    }
                                </>
                            }

                        </ul>
                    </div>
                }
            </div>
        </div >
    );
};

interface OptionsInputProp {
    label?: string,
    onChange(val: string | { [key: string]: any }): void,
    onClick?(): void,
    value: string | any[],
    placeHolder: string | React.FC,
    className: string,
    options: string | ReactElement | any | { [key: string]: any, link?: string, externalLink?: string, label?: string },
    addFunction: React.FC,
    multiSelect: boolean,
    isContextMenu: boolean,
    field: string,
    displayField: string,
    ellipseIcon?: string,
    onKeyDown?(e: React.KeyboardEvent): void,
    isSearchable?: boolean
};
