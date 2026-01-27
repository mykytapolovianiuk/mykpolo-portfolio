'use client';

import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '',
  ...props 
}: ButtonProps) {
  const baseClasses = 'font-bold uppercase tracking-wider transition-all duration-300 border-2';
  
  const variantClasses = {
    primary: 'bg-brand-white text-brand-black border-brand-white hover:bg-brand-black hover:text-brand-white',
    secondary: 'bg-brand-black text-brand-white border-brand-white hover:bg-brand-white hover:text-brand-black',
    outline: 'bg-transparent text-brand-white border-brand-white hover:bg-brand-white hover:text-brand-black',
  };
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}