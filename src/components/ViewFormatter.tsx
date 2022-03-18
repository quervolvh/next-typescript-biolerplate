import React, { useState } from 'react';
// import { RightIcon } from 'components';
import { classnames } from 'utils';
import { LinkWrapper } from './LinkWrapper';

export const ViewFormatterIconBox: React.FC<IconProps> = ({ textIcon, svgIcon, iconClass, linkIcon }) => {

    return (
        <>
            {textIcon && <span className={iconClass || ""}> {textIcon} </span>}
            {svgIcon && <div className={iconClass || ""} dangerouslySetInnerHTML={{ __html: svgIcon }} />}
            {linkIcon && <img className={iconClass || ""} src={linkIcon} />}
        </>
    );

}

export const ViewFormatter: React.FC<Props> = ({ title, extraValue, value, type = "", className = "", ...props }) => {

    const [isCollapsed, setIsCollapsed] = useState(false);
    const collapsible = type === "Collapsible";
    const collapsedClass = isCollapsed ? "collapsible collapsible-show" : "collapsible";

    // const hasRightIcon = props.rightIcon !== null ? true : false;

    const onClick = () => {
        if (collapsible) {
            setIsCollapsed(!isCollapsed);
            return;
        }
        props.onClick ? props.onClick() : () => null;
    };

    if (props.visible === false) {
        return null
    }

    return (
        <LinkWrapper
            link={props.link}
            externalLink={props.externalLink}
        >
            <>

                {
                    ["settings-item", "settings-item-flex", "classic"].includes(String(type))

                    &&

                    <div
                        className={classnames('view-formatter', type, className)}
                        onClick={() => onClick()}
                        tabIndex={0}
                        role={"button"}
                    >

                        <ViewFormatterIconBox
                            svgIcon={props.svgLeftIcon}
                            textIcon={props.leftTextIcon}
                            iconClass='view-formatter-left-icon'
                            linkIcon={props.linkIcon}
                        />

                        <div>

                            <p> {title || ""} </p>
                            {value && <p> {value} </p>}

                        </div>


                        <ViewFormatterIconBox
                            svgIcon={undefined}
                            iconClass="view-formatter settings-item-icon"
                        />


                    </div>

                }

                {!["settings-item", "settings-item-flex", "classic"].includes(String(type)) &&


                    <div
                        className={`view-formatter ${collapsible ? collapsedClass : ""} ${className || ""}`}
                        onClick={() => onClick()}
                        tabIndex={0}
                        role={"button"}
                    >

                        <div className="view-formatter-title-box">


                            <p> {title || ""} </p>

                            <ViewFormatterIconBox
                                svgIcon={undefined}
                                iconClass='collapsible-icon'
                            />


                        </div>

                        <span>

                            {Array.isArray(value) ?

                                value.map((item, index) =>

                                    <p
                                        key={`${title}-${index}`}
                                        className={classnames(props.valueClass, "view-formatter-p")
                                        }>

                                        {String(item) || ""}

                                    </p>

                                )

                                :

                                <p className={classnames(props.valueClass)}> {value || ""} </p>

                            }

                            {extraValue && <p> {extraValue || ""} </p>}

                        </span>


                    </div>
                }
            </>
        </LinkWrapper>
    )
}

interface IconProps {
    textIcon?: string,
    svgIcon?: string,
    iconClass?: string,
    linkIcon?: string
}

interface Props {
    title?: string,
    value?: string | number | string[],
    valueClass?: string,
    type?: string,
    onClick?(): void,
    className?: string,
    visible?: boolean,
    svgLeftIcon?: string,
    leftTextIcon?: string,
    extraValue?: string,
    rightIcon?: null | undefined | string,
    linkIcon?: string,
    link?: string,
    externalLink?: string
}
