import React from 'react';
import { classnames } from 'utils/index';

export const Toast: React.FC<{ toast: { id: string, text: string }, onClick(): void }> = ({ toast, ...props }) => {

    return (
        <>
            <div
                className={classnames('toast')}
                onClick={() => props.onClick()}
            >
                <div className="toast-container">
                    <span>{toast.text}</span>
                </div>
            </div>
        </>
    );
};
