import React from 'react';

export const Button = ({ label, onClick, className, disabled }) => {

  const ButtonTitle = () => {
    return (
      <span>
        {label || "button"}
      </span>
    );
  };

  return (
    <button className={`button ${className}`} onClick={(event) => onClick(event)} disabled={disabled}>
      <ButtonTitle />
    </button>
  );
};

