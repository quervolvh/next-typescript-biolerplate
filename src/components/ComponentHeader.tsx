import React, { ReactElement } from 'react';

export const ComponentHeader: React.FC<Props> = ({ className, title, subtitle, ...props }) => {

    return (

        <div
            className={`component-header ${className || ""}`}>

            {title && <h2> {title} </h2>}

            {subtitle && <h4> {subtitle} </h4>}

            {props.control && props.control}

        </div>

    );
}

interface Props {
    title?: string,
    subtitle?: string,
    className?: string,
    control?: ReactElement<any, any>
}
