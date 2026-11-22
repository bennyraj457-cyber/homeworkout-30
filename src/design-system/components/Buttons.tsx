import React from 'react';
import { Loader2 } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  children,
  className = '',
  ...props
}) => {
  const isDisabled = disabled || loading;

  const baseStyles =
    'inline-flex items-center justify-center font-semibold transition-all duration-150 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E53935] focus-visible:ring-offset-2 rounded-[8px] active:scale-[0.99]';

  const sizeStyles: Record<ButtonSize, string> = {
    sm: 'h-9 px-3.5 text-[13px] gap-1.5',
    md: 'h-11 px-4 text-[14px] gap-2',
    lg: 'h-[52px] px-6 text-[16px] gap-2.5',
  };

  const variantStyles: Record<ButtonVariant, string> = {
    primary: isDisabled
      ? 'bg-[#F3F4F6] text-[#9CA3AF] border border-[#E5E7EB] cursor-not-allowed active:scale-100'
      : 'bg-[#E53935] hover:bg-[#D32F2F] active:bg-[#C62828] text-white shadow-hf-red border border-transparent',
    secondary: isDisabled
      ? 'bg-[#F3F4F6] text-[#9CA3AF] border border-[#E5E7EB] cursor-not-allowed active:scale-100'
      : 'bg-[#1E293B] hover:bg-[#0F172A] active:bg-[#020617] text-white border border-transparent',
    outline: isDisabled
      ? 'bg-white text-[#9CA3AF] border border-[#E5E7EB] cursor-not-allowed active:scale-100'
      : 'bg-white hover:bg-[#FEF2F2] active:bg-[#FEE2E2] text-[#111827] hover:text-[#E53935] border border-[#D1D5DB] hover:border-[#E53935]',
    ghost: isDisabled
      ? 'bg-transparent text-[#9CA3AF] cursor-not-allowed active:scale-100'
      : 'bg-transparent hover:bg-[#F8FAFC] active:bg-[#F1F5F9] text-[#4B5563] hover:text-[#111827]',
    danger: isDisabled
      ? 'bg-[#F3F4F6] text-[#9CA3AF] cursor-not-allowed'
      : 'bg-[#FEF2F2] hover:bg-[#FEE2E2] active:bg-[#FECACA] text-[#DC2626] border border-[#FECACA]',
  };

  return (
    <button
      disabled={isDisabled}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin shrink-0" strokeWidth={2.25} />
          <span>{children || 'Loading...'}</span>
        </>
      ) : (
        <>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'subtle';
  size?: 'sm' | 'md' | 'lg';
  label: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  variant = 'outline',
  size = 'md',
  label,
  disabled = false,
  className = '',
  ...props
}) => {
  const sizeClasses = {
    sm: 'w-9 h-9',
    md: 'w-11 h-11',
    lg: 'w-[52px] h-[52px]',
  };

  const variantClasses = {
    primary: disabled
      ? 'bg-[#F3F4F6] text-[#9CA3AF] border border-[#E5E7EB] cursor-not-allowed'
      : 'bg-[#E53935] hover:bg-[#D32F2F] active:bg-[#C62828] text-white shadow-hf-red',
    secondary: disabled
      ? 'bg-[#F3F4F6] text-[#9CA3AF] cursor-not-allowed'
      : 'bg-[#1E293B] hover:bg-[#0F172A] text-white',
    outline: disabled
      ? 'bg-white text-[#9CA3AF] border border-[#E5E7EB] cursor-not-allowed'
      : 'bg-white hover:bg-[#FEF2F2] text-[#111827] hover:text-[#E53935] border border-[#D1D5DB] hover:border-[#E53935]',
    subtle: disabled
      ? 'bg-[#F8FAFC] text-[#9CA3AF] cursor-not-allowed'
      : 'bg-[#F8FAFC] hover:bg-[#FEF2F2] text-[#4B5563] hover:text-[#E53935] border border-[#E5E7EB]',
  };

  return (
    <button
      type="button"
      disabled={disabled}
      aria-label={label}
      title={label}
      className={`inline-flex items-center justify-center rounded-[8px] transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E53935] focus-visible:ring-offset-2 active:scale-95 ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {icon}
    </button>
  );
};
