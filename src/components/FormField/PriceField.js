import React from 'react';
import { numberFormat } from 'utils';
import NumberFormat from 'react-number-format';

export const PriceField = ({ onChange, value, ...props }) => {

    const prefix = numberFormat(22, props.prefix)[0];

    const numberText = (text) => (text || "0")
        .replace(/,/g, '')
        .replace(props.suffix || '', '')
        .replace(prefix || '', '');

    return (
        <div className={`form-field ${props.className}`}>
            {props.title && <p className="form-field-title"> {props.title} </p>}

            <div className="form-field-quantity-input">

                <NumberFormat
                    suffix={props.suffix}
                    prefix={prefix}
                    isNumericString={true}
                    value={value || ''}
                    placeholder={props.placeholder}
                    onChange={e => onChange(Number(numberText(e.target.value)))}
                    thousandSeparator={true}
                    allowNegative={false}
                    allowLeadingZeros={true}
                />

            </div>
        </div>
    );
};
