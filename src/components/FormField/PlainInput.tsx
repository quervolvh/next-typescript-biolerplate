import React, { useState } from 'react';
import Eye from 'assets/svg/eye.svg';
import EyeOff from 'assets/svg/eye-off.svg';
import { Button, FormError } from 'components';
import { classnames } from 'utils/index';
import { isNumber } from 'utils/index';

export const PlainInput: React.FC<Props> = (
    {
        type,
        label,
        onChange,
        onClick,
        value,
        placeHolder,
        className = '',
        errorClass = "-",
        withButton,
        onlyNumber,
        withLabelButton,
        alignIconToLeft,
        withBorder,
        ...props
    }
) => {

    const [visibility, setVisibility] = useState(false);

    const passwordType = visibility === true ? "text" : "password";

    const change = (val: any) => {
        if (onChange) {
            if ((onlyNumber && isNumber(val)) || (!onlyNumber && true) || val === "") onChange(val);
        }
    };

    const errorText = () => {
        if (typeof props.error === "string") return props.error;
        return null;
    }

    const errorTextClass = () => {
        if (typeof props.error === "string") return undefined;
        return undefined;
    }

    const errorOutput = errorText();

    const ButtonAddOn = ({ ...buttonProps }) => (

        <Button
            label={buttonProps.label}
            onClick={() => buttonProps.onClick && buttonProps.onClick()}
            disabled={buttonProps.disabled}
            className={buttonProps.className || ""}
        />

    );

    return (
        <div
            className={
                classnames(
                    'form-field',
                    className,
                    withBorder && "form-field-with-border",
                    type === 'password' && 'with-password',
                    alignIconToLeft && "form-field-icon-left",
                    withButton ? "with-button" : ''
                )}
        >

            {label &&

                <div className={
                    classnames(
                        "form-field-title-block",
                        (props.withExtraLabelComponent || withLabelButton) && "form-field-title-block-flex"
                    )
                }>

                    <p className="form-field-title">

                        {label}

                        {props.required === false ?
                            <i className="form-field-optional"> (Optional) </i> :
                            <></>
                        }

                    </p>

                    {withLabelButton && <ButtonAddOn  {...withLabelButton} />}

                    {props.withExtraLabelComponent && props.withExtraLabelComponent}

                </div>

            }

            {props.svgIcon && <div className="form-field-icon" dangerouslySetInnerHTML={{ __html: props.svgIcon }} />}

            {props.icon && <img src={props.icon} alt={"input-icon"} />}

            <input
                type={type === 'password' ? passwordType : type}
                className="form-input"
                onChange={(e) => !props.disabled && change(e.target.value)}
                placeholder={placeHolder}
                readOnly={props.readonly || false}
                onKeyDown={(e) => props.onKeyDown && props.onKeyDown(e)}
                onClick={() => typeof onClick === "function" && onClick()}
                {... (type !== "password" && { value })}
            />

            {type === 'password' &&
                <img
                    className='form-field-password-toggle'
                    src={visibility ? EyeOff : Eye}
                    onClick={() => setVisibility(prevState => !prevState)} />
            }

            <FormError
                condition={errorOutput !== null}
                text={errorOutput ? errorOutput : ""}
                className={classnames(errorClass, errorTextClass() && errorTextClass())}
                noIcon={errorTextClass() === "account-name-value" || errorTextClass() === "account-name-loader"}
            />

            {withButton && <ButtonAddOn  {...withButton} />}

        </div>
    );
};

interface Props {
    type: string,
    label?: string,
    onlyNumber?: true,
    errorClass?: string,
    onChange?(arg: any): () => void,
    onClick?: () => void,
    value?: string,
    placeHolder?: string,
    className?: string,
    icon?: string,
    alignIconToLeft?: boolean,
    svgIcon?: string,
    disabled?: boolean,
    readonly?: boolean,
    error?: boolean | string,
    onKeyDown?(e: React.KeyboardEvent): void,
    required?: boolean,
    withBorder?: boolean,
    withButton?: { label: string, onClick?(): void, className?: string, disabled?: boolean },
    withLabelButton?: { label: string, onClick?(): void, className?: string, disabled?: boolean },
    withExtraLabelComponent?: React.FC | React.ReactElement,
}
