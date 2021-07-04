import React, { useState } from 'react';

const EyeOff = () => {
    return (
        <></>
    );
}

export const PlainInput = ({ type, title, onChange, value, placeholder, className }) => {

    const [visivility, setVisibility] = useState(false);
    const passwordType = visivility === true ? "text" : "password";

    const change = (val) => {
        onChange(val);
    };

    return (
        <div className={`form-field ${className} ${type === 'password' ? 'with-password' : ''}`}>
            {title && <p className="form-field-title"> {title} </p>}
            <input
                type={type === 'password' ? passwordType : type}
                className="form-input"
                onChange={(e) => change(e.target.value)}
                value={value || ""}
                placeholder={placeholder}
            />
            {type === 'password' &&
                <img
                    className='form-field-password-toggle'
                    src={EyeOff}
                    onClick={() => setVisibility(prevState => !prevState)} />
            }
        </div>
    );
};
