import React from 'react';

export interface BaseButtonProps {
  to?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export interface SessionButtonProps {
  time: string;
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
}