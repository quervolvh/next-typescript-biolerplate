import React, { useState } from 'react';
import { setBase64 } from 'utils';

const Upload = () => {
  return <></>;
};

export const ImageInput = ({ label, onChange, value, className, instruction, showDragDropField }) => {
  const [visibility, setVisibility] = useState(false);

  const onItemDrop = event => {
    event.preventDefault();
    if (event.dataTransfer.items[0].kind === 'file') {
      const item = event.dataTransfer.files[0];
      if (!item.type.includes('image')) {
        return;
      }
      setBase64(item, onChange);
      setVisibility(false);
    }
  };

  return (
    <div>
      <div className={`form-field ${className}`}>
        {label && <p className="form-field-title form-field-image-title"> {label} </p>}
        <label
          className={`form-field-image ${visibility ? 'darken' : ''} ${showDragDropField ? '' : 'hide-drop-zone'} `}
          onDragEnter={() => setVisibility(true)}
          onDragLeave={() => setVisibility(false)}
          onDragOver={e => e.preventDefault()}
          onDrop={e => onItemDrop(e)}
        >
          <input type="file" onChange={event => setBase64(event.target.files[0], onChange)} accept="image/*" />

          {value === undefined ? (
            <div className="form-field-image-none">
              <Upload />
              {showDragDropField && <p className="form-field-title"> {instruction || ''} </p>}
            </div>
          ) : (
            <div className="form-field-image-yes">
              <img src={value} alt={'post-up'} className="creating-image m-0" loading="lazy" />
            </div>
          )}

          {!showDragDropField && instruction && <p> {instruction} </p>}
        </label>
      </div>
    </div>
  );
};
