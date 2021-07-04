import React, { useState } from 'react';
import { setBase64 } from 'utils';

const Upload = () => {
    return (<></>);
}

export const ImageInput = ({ title, onChange, value, className }) => {
    const [visivility, setVisibility] = useState(false);

    const onItemDrop = (event) => {
        event.preventDefault();
        if (event.dataTransfer.items[0].kind === 'file') {
            const item = event.dataTransfer.files[0];
            if (!item.type.includes("image")) {
                return;
            }
            setBase64(item, onChange);
            setVisibility(false);
        }
    }

    return (
        <div>
            <div
                className={`form-field ${className}`}>
                {title && <p className="form-field-title"> {title} </p>}
                <label
                    className={`form-field-image ${visivility ? 'darken' : ''}`}
                    onDragEnter={() => setVisibility(true)}
                    onDragLeave={() => setVisibility(false)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => onItemDrop(e)}
                >
                    <input type="file" onChange={(event) => setBase64(event.target.files[0], onChange)} accept="image/*" />
                    {value === undefined ? (
                        <div className="form-field-image-none">
                            <Upload />
                            <p className="form-field-title"> Drag a file here or click to upload </p>
                        </div>
                    ) : (
                        <div className="form-field-image-yes">
                            <img src={value} alt={'post-up'} className="creating-image" />
                        </div>
                    )}
                </label>
            </div>
        </div>
    )
};
