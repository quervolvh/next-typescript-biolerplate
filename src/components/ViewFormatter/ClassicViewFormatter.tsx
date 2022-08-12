import React from 'react';
import { classnames } from 'utils';

export const ClassicViewFormatter: React.FC<Props> = ({
    title,
    value,
    type = "",
    className = "",
    ...props
}) => {

    const onClick = () => {

        props.onClick ? props.onClick() : () => null;

    };

    return (

        <>

            <div
                className={classnames('view-formatter', type, className)}
                onClick={() => onClick()}
                tabIndex={0}
                role={"button"}
            >

                <div className={classnames(props.textBoxClass)}>

                    <p className={classnames(props.titleClass)}> {title || ""} </p>

                    {value && <p className={classnames(props.valueClass)}> {value} </p>}

                </div>


            </div>


        </>
    )
}

interface Props {
    title?: string,
    value?: string | number | string[],
    titleClass?: string,
    valueClass?: string,
    type?: "settings-item" | "settings-item-flex" | "classic",
    onClick?(): void,
    className?: string,
    svgLeftIcon?: string,
    leftTextIcon?: string,
    rightIcon?: null | undefined | string,
    linkIcon?: string,
    textBoxClass?: "view-formatter-text-box-flex"
}
