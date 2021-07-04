import React from 'react';
import { PlainInput } from './PlainInput';
import { ImageInput } from './ImageInput';
import { TextAreaInput } from './TextAreaInput';
import { PriceField } from './PriceField';

export const FormField = (props) => {

    let RenderElement = () => null;

    switch (props.type) {

        case 'image':
            RenderElement = ImageInput;
            break;
        case 'textarea':
            RenderElement = TextAreaInput;
            break;
        case 'price-field':
            RenderElement = PriceField;
            break;
        default:
            RenderElement = PlainInput;
    }

    return (
        <RenderElement {...props} />
    );
};
