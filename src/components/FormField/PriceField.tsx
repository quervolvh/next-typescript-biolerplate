import React from 'react';
import { numberFormat } from 'utils';
import NumberFormat from 'react-number-format';
import { FormError } from 'components';

export const PriceField: React.FC<Props> = ({ onChange, value, ...props }) => {

    const errorOutput = props.error;

    const prefix = numberFormat(22, props.prefix)[0];

    const withMax = (newValue: number): number => {
        if (props.max) {
            if (newValue > props.max) {
                if (newValue < Number(value)) return newValue;
                return Number(value)
            }
            return Number(newValue);
        }

        return newValue;
    }

    const numberText = (text: string) => {
        const numberValue = Number((text || "0")
            .replace(/,/g, '')
            .replace(props.suffix || '', '')
            .replace(prefix || '', ''));
        return withMax(numberValue);
    }

    const patternExtra = (data: string) => {

        let value = String(data).replace(/\s/g, '');
        if ( props.pattern === "##/##" ) value = value.replace("/",""); 

        if (props.pattern === "##/##") {
            let asArray = [...value];
            const year = asArray.splice(2,4);
            let month = asArray.splice(0,2);

            if (month.length === 2) {
                if ( Number(month.join("")) > 12 ) month = ["1","2"];
                asArray = [...month , ...year ];
                value = asArray.join("");
            }
        }

        onChange && onChange(value);

    };

    return (
        <div className={`form-field ${props.className || ""}`}>
            {props.label && <p className="form-field-title"> {props.label} </p>}

            <div className="form-field-quantity-input">

                <NumberFormat
                    suffix={props.suffix}
                    prefix={prefix}
                    isNumericString={true}
                    value={value}
                    placeholder={props.placeHolder}
                    onChange={e =>
                        onChange && (props.pattern
                            ? patternExtra(e.target.value)
                            : onChange(numberText(e.target.value)
                            )
                        )
                    }
                    thousandSeparator={true}
                    allowNegative={false}
                    allowLeadingZeros={true}
                    readOnly={props.readonly || false}
                    format={props.pattern}
                    mask={props.mask}
                />

                <FormError
                    condition={typeof errorOutput === "string"}
                    text={errorOutput ? errorOutput : ""}
                    className="-"
                />

            </div>
        </div>
    );
};

interface Props {
    onChange?(val: number | string): void,
    value?: number,
    suffix?: string,
    prefix?: string,
    label?: string,
    className?: string,
    placeHolder?: string,
    max?: number,
    readonly?: boolean,
    error?: string,
    pattern?: string,
    mask?: string
}
