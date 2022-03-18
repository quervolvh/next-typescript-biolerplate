import React from 'react';
// import { CopyIcon } from 'components';
import { quickToast } from 'redux/store';

export const CopyToClipBoard: React.FC<{ text: string, displayText?: string }> = ({ text, displayText }) => {

    const copy = () => {
        navigator?.clipboard?.writeText?.(text);
        quickToast({ text: "copied" });
    }

    return (

        <span onClick={() => copy()}>
            <span>{displayText ? displayText : text} </span>
            {/* <span dangerouslySetInnerHTML={{ __html: CopyIcon }} /> */}
        </span>

    )

}

