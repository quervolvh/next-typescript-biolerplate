import React from 'react';

export const TextAreaInput = ({ type, title, onChange, value, placeholder, className }) => {

    const change = (val) => {
        onChange(val);
    };

    return (
        <div className={`form-field ${className}`}>
            {title && <p className="form-field-title"> {title} </p>}
            <textarea
                type={type}
                className="form-input"
                onChange={(e) => change(e.target.value)}
                value={value}
                placeholder={placeholder || ''}
            />
        </div>
    );
};
