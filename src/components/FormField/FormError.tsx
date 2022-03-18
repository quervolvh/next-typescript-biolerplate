import React from 'react';
// import { BadInputIcon } from 'components';
import { classnames } from 'utils';

export const FormError: React.FC<Props> = ({
    condition,
    text,
    className = "pt-1 mb-4",
    // noIcon = false
}) => {
    return (
        <div
            className={classnames('form-field-error', condition ? `form-field-error-v strickFadeIn ${className}` : "")}>
            {/* {noIcon === false && <span dangerouslySetInnerHTML={{ __html: BadInputIcon }} />} */}
            <small className="ml-2">  {!condition ? "" : text || ''} </small>
        </div>
    );
}

interface Props {
    condition?: boolean,
    text?: string,
    className?: string,
    noIcon?: boolean
}
