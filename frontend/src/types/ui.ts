import React from 'react';

export interface BaseButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    to?: string;
    className?: string;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
}

export interface IconProps {
    size?: number;
    className?: string;
    color?: string;
}