import React from 'react';

export const ViewFormatterIconBox: React.FC<IconProps> = ({ textIcon, svgIcon, iconClass, linkIcon }) => {

    return (
        <>
            {textIcon && <span className={iconClass || ""}> {textIcon} </span>}
            {svgIcon && <div className={iconClass || ""} dangerouslySetInnerHTML={{ __html: svgIcon }} />}
            {linkIcon && <img className={iconClass || ""} src={linkIcon} />}
        </>
    );

}

interface IconProps {
    textIcon?: string,
    svgIcon?: string,
    iconClass?: string,
    linkIcon?: string
}
