import React from 'react';
import { classnames } from 'utils/index';

export const Switch: React.FC<Props> = ({ label, placeHolder, onChange, value, className = '', ...props }) => {

    const change = () => {
        if (typeof value === "boolean" && onChange) {
            if (props.disabled !== true && props.readonly !== true) onChange();
        }
    };

    return (
        <div
            className={classnames('form-field', 'form-field-switch', className)}>

            {
                (label || placeHolder) &&

                <div>

                    {label &&

                        <p className="form-field-title">

                            {label}

                            {props.required ? <i className="form-field-optional"> (Optional) </i> : <></>}

                        </p>
                    }

                    {placeHolder &&

                        <p className="form-field-switch-placeholder">  {placeHolder}  </p>

                    }

                </div>

            }

            <div
                className={
                    classnames(
                        "form-field-switch-box",
                        value && "form-field-switch-box-on",
                        props.svgIcon && 'form-field-switch-box-with-icon'
                    )
                }
                tabIndex={0}
                role={"button"}
                onClick={() => change()}>

                <div
                    className={
                        classnames(
                            "form-field-switch-toggler",
                            value && 'form-field-switch-toggler-on',
                            props.svgIcon && 'form-field-switch-toggler-with-icon'
                        )
                    }
                >

                    {props.svgIcon &&

                        <div className='form-field-switch-toggler-icon'
                            dangerouslySetInnerHTML={{ __html: props.svgIcon }}
                        />

                    }

                </div>

            </div>

        </div>
    );
};

interface Props {
    label?: string,
    onChange?(): () => void,
    value?: string,
    placeHolder?: string,
    className?: string,
    disabled?: boolean,
    readonly?: boolean,
    required?: boolean,
    svgIcon?: string
}
