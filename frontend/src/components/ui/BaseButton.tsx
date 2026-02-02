import React from 'react';
import {Link} from 'react-router-dom';
import type {BaseButtonProps} from '@/types/button';

interface Props extends BaseButtonProps {
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
}

const BaseButton: React.FC<Props> = ({
                                         to,
                                         onClick,
                                         children,
                                         className = "",
                                         type = "button",
                                         disabled = false
                                     }) => {
    const baseStyles = `relative overflow-hidden transition-all duration-500 bg-gradient-to-tr from-[#0753E0] to-[#032D7B] flex items-center justify-center text-white
    ${disabled
        ? 'opacity-50 cursor-not-allowed'
        : 'hover:from-[#032D7B] hover:to-[#0753E0] active:scale-95'
    }`;

    if (to && !disabled) {
        return <Link to={to} className={`${baseStyles} ${className}`}>{children}</Link>;
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${className}`}
        >
            {children}
        </button>
    );
};

export default BaseButton;