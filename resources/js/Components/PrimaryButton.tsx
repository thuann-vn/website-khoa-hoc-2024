import { ButtonHTMLAttributes } from 'react';

export default function PrimaryButton({ className = '', disabled, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
      <button
        {...props}
        className={
          `rbt-btn btn-md btn-gradient hover-icon-reverse w-100 ${
            disabled && 'opacity-25'
          } ` + className
        }
        disabled={disabled}
      >
        <span
          className="icon-reverse-wrapper"><span className="btn-text">

        {children}
        </span><span className="btn-icon"><i
          className="feather-arrow-right"></i></span><span className="btn-icon"><i className="feather-arrow-right"></i></span></span>
      </button>
    );
}
