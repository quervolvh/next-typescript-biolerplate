import React from 'react';
import { classnames } from 'utils';

export const LabeledCheckbox: React.FC<Props> = ({ label, type = "checkbox", className = "", value, onChange }) => {

    const change = () => {
        if (onChange) {
            onChange(!value);
        }
    }

    return (
        <div
            className={classnames('form-field', 'labelled-checkbox', className, type === "radio" ? "form-field-radio-wrapper" : "")}
            onClick={() => change()}
            tabIndex={0}
            role={"button"}
        >

            {type === "checkbox" &&

                <div
                    className={`custom-checkbox-wrapper`}>


                    <label className="custom-checkbox" onClick={() => change()}>
                        <input
                            type={"checkbox"}
                            checked={value}
                        />
                        <span className="checkmark" />
                    </label>

                </div>

            }

            {type === "radio" &&
                <div
                    className={classnames("form-field-radio", value === true ? "form-field-radio-selected" : "")}
                >
                    <div className="form-field-radio-bg" />
                </div>
            }


            {label &&
                <p className="form-field-title">
                    {label}
                </p>
            }

        </div>
    );
};

interface Props {
    label?: string,
    onChange?(arg?: any): void,
    value?: boolean,
    className?: string,
    type?: string
}
