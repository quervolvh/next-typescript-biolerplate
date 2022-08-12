import React, { useState } from 'react';
import { RightIcon } from 'components';
import { classnames } from 'utils';
import { ViewFormatterIconBox } from './ViewFormatterIconBox';

export const RegularViewFormatter: React.FC<Props> = ({ ...props }) => {

    const { title, extraValue, value, type = "", className = "", titleClass, valueClass, onClick, visible } = props;

    const [isCollapsed, setIsCollapsed] = useState(false);

    const collapsible = type === "Collapsible";

    const collapsedClass = isCollapsed ? "collapsible collapsible-show" : "collapsible";

    const onClickItem = () => {

        if (collapsible) {
            setIsCollapsed(!isCollapsed);
            return;
        }

        onClick ? onClick() : () => null;

    };

    if (visible === false) {

        return null

    }

    return (

        <div
            className={`view-formatter ${collapsible ? collapsedClass : ""} ${className || ""}`}
            onClick={() => onClickItem()}
            tabIndex={0}
            role={"button"}
        >

            <div className="view-formatter-title-box">


                <p className={classnames(titleClass)}> {title || ""} </p>

                <ViewFormatterIconBox
                    svgIcon={collapsible ? RightIcon() : undefined}
                    iconClass='collapsible-icon'
                />

            </div>

            <span>

                {Array.isArray(value) ?

                    value.map((item, index) =>

                        <p key={`${title}-${index}`} className={classnames(valueClass, "view-formatter-p")}>

                            {String(item) || ""}

                        </p>

                    )

                    : <p className={classnames(valueClass, "view-formatter-regular-value")}> {value || ""} </p>

                }

                {extraValue && <p> {extraValue || ""} </p>}

            </span>

        </div>

    )
}

interface Props {
    title?: string,
    value?: string | number | string[],
    valueClass?: string,
    type?: "settings-item" | "settings-item-flex" | "classic" | string,
    onClick?(): void,
    titleClass?: string,
    className?: string,
    visible?: boolean,
    extraValue?: string,
}
