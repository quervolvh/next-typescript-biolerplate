import React from 'react';
import { PlainInput } from './PlainInput';
import { ImageInput } from './ImageInput';
import { TextAreaInput } from './TextAreaInput';
import { PriceField } from './PriceField';
import { ReactElement } from 'react';
import { LabeledCheckbox } from './LabelledCheckBox';
import { OptionsInput } from './OptionsInput';
import { Switch } from './Switch';

export const FormField: React.FC<Props> = (props) => {

    const redefinedProps = {
        ...props,
        className: props.className ? props.className : ""
    }

    let RenderElement: ReactElement | any = () => null;

    switch (props?.type) {
        case 'image':
            RenderElement = ImageInput;
            break;
        case 'option':
            RenderElement = OptionsInput;
            break;
        case 'textarea':
            RenderElement = TextAreaInput;
            break;
        case 'price-field':
        case 'pattern':
            RenderElement = PriceField;
            break;
        case 'checkbox':
            RenderElement = LabeledCheckbox;
            break;
        case 'switch':
            RenderElement = Switch;
            break;
        default:
            RenderElement = PlainInput;
    }

    return (
        <RenderElement {...redefinedProps} />
    );
};

interface Props {
    type?: 'pin' | 'image' | 'option' | 'textarea' | 'price-field' | 'checkbox' |
    'switch' | 'plain' | 'account-number' | 'password' | 'toggle' | 'date' | 'pattern',
    label?: string,
    onChange?: (e?: any) => void,
    value?: string | [] | {} | undefined | null | boolean | number,
    placeHolder?: string | React.FC | React.ReactElement,
    withExtraLabelComponent?: React.FC | React.ReactElement,
    className?: string,
    svgIcon?: string,
    instruction?: string,
    showDragDropField?: boolean,
    disabled?: boolean,
    max?: number,
    options?: Array< string | ReactElement | any | { [key: string]: any, link?: string, externalLink?: string, label?: string }>,
    field?: string,
    displayField?: string,
    readonly?: boolean,
    error?: boolean | string,
    onKeyDown?(e: React.KeyboardEvent): void,
    required?: boolean,
    isContextMenu?: boolean,
    ellipseIcon?: string,
    isSearchable?: boolean,
    bankCode?: string,
    setAccountDetails?(e: any): void,
    withButton?: { label: string, onClick?(): void, className?: string, disabled: boolean },
    withLabelButton?: { label: string, onClick?(): void, className?: string, disabled: boolean },
    errorClass?: string,
    prefix?: string,
    pattern?: string,
    mask?: string,
    onlyNumber?: boolean,
    onClick?(): void ,
    numInputs?: number,
    shouldAutoFocus?: boolean,
    minDate?: Date,
    alignIconToLeft?: boolean,
    withBorder?: boolean
}
