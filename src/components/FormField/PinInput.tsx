import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import { FormError } from './FormError';

export const PinInput: React.FC<Props> = ({ label, onChange, numInputs, className, error, ...props }) => {

    const shuffleCharacters = () => {

        let array = [
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
            'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
            'w', 'x', 'y', 'z'
        ];

        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        let mapping: {
            obscure: { [key: string]: string },
            reveal: { [key: string]: string }
        } = { obscure: {}, reveal: {} };

        array.slice(0, 10).forEach((item, index) => {

            mapping["obscure"][String(index)] = item;

            mapping["reveal"][item] = String(index);

        });

        return mapping;

    }

    const [state, setState] = useState({ mapping: shuffleCharacters(), value: '' });

    const change = (val: any) => {

        if (onChange) {

            let obscuredVal = "";

            let revealedVal = "";

            if (val) {

                [...String(val)].forEach(item => obscuredVal += (state.mapping["obscure"][item] || item));

            }

            if ( obscuredVal ) {

                [...String(obscuredVal)].forEach(item => revealedVal += (state.mapping["reveal"][item]));

            }

            onChange(revealedVal);

            setState((prevState) => ({ ...prevState, value: obscuredVal }));

        }
    };

    return (
        <div className={`form-field form-field-pin ${className}`}>

            {label && <p className="form-field-title"> {label} </p>}

            <OtpInput
                className="form-field-pin-input"
                containerStyle={{ justifyContent: "space-between", width: "100%" }}
                value={state.value}
                onChange={(e: any) => !props.disabled && change(e)}
                numInputs={numInputs || 4}
                isDisabled={props.disabled || false}
                placeholder={props.placeHolder}
                shouldAutoFocus={props.shouldAutoFocus}
                isInputSecure={true}

            />

            <FormError
                condition={typeof error === "string"}
                text={(error && typeof error === "string") ? error : ""}
                className="ml-0"
            />

        </div>
    );
};

interface Props {
    label?: string,
    onChange?(arg: any): () => void,
    value?: string,
    className?: string,
    disabled?: boolean,
    numInputs?: number,
    placeHolder?: string,
    onKeyDown?(e: React.KeyboardEvent): void,
    shouldAutoFocus?: boolean,
    isInputSecure?: boolean,
    error?: string | boolean
}
