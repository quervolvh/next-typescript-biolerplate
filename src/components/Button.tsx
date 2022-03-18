import React from 'react';
import { classnames } from 'utils';
import { LinkWrapper } from './LinkWrapper';

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  className,
  disabled,
  type,
  svgIcon,
  secondaryLabel,
  color,
  link,
  externalLink
}) => {

  const ButtonTitle = () => {
    return (
      <span className={classnames("button-title", secondaryLabel && "button-title-dual")}>
        <span className={color || ""}> {label || "button"} </span>
        {secondaryLabel && <span className={color || ""}> {secondaryLabel} </span>}
      </span>
    );
  };

  const click = (event: any) => {
    if (onClick) {
      onClick(event);
      return null;
    }
  }

  return (
    <LinkWrapper
      link={link}
      externalLink={externalLink}
    >
      <button
        className={
          classnames(
            'button',
            className,
            type === "floating-action" && "button-fab",
            svgIcon && "button-flex"
          )
        }
        onClick={(event) => click(event)}
        disabled={disabled}
      >

        {type === "floating-action" ?
          <i className="fas fa-plus" />
          :
          <ButtonTitle />
        }

        {svgIcon && <div dangerouslySetInnerHTML={{ __html: svgIcon }} />}

      </button>
    </LinkWrapper>
  );

};

export interface ButtonProps {
  label?: string,
  onClick?(event?: any): void,
  className?: string,
  disabled?: boolean,
  type?: 'floating-action' | 'normal',
  svgIcon?: string,
  secondaryLabel?: string,
  color?: string,
  link?: string,
  externalLink?: string
}
