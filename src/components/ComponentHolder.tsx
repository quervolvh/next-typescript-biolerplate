import React, { ReactElement } from 'react';
import { ComponentHeader } from 'components';
import { classnames } from 'utils';

export const ComponentHolder: React.FC<Props> = ({ visibility, ...props }) => {

    return (
        <>
            {(visibility === false ? visibility : true) &&

                <div className={`component-holder ${props.className || ""}`}>

                    {(props.title || props.customHeader || props.control) &&

                        <>
                            {!props.customHeader ?

                                < ComponentHeader {...props} className={props.headerClass || ""} />

                                :

                                <props.customHeader />
                            }

                        </>
                    }

                    <div className={classnames("component-holder-body", props.bodyClass)}>
                        {props.children && props.children}
                    </div>
                </div>
            }
        </>
    );
}

interface Props {
    control?: ReactElement<any, any>,
    visibility?: boolean,
    title?: string,
    subtitle?: string,
    customHeader?: React.FC,
    className?: string,
    bodyClass?: string,
    headerClass?: string
}
