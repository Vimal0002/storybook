import React, { useState, useMemo, ChangeEvent, FocusEvent } from 'react';
import { InputFieldProps } from '../types';

/**
 * A flexible input component with validation states.
 */
export function InputField<T extends string | number | undefined>({
  value,
  onChange,
  onBlur,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  variant = 'outlined',
  size = 'md',
  type = 'text',
}: InputFieldProps<T>) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Determine the base classes for the input field
  const baseClasses = `
    w-full
    px-3
    py-2
    rounded-lg
    focus:outline-none
    transition-all
    duration-200
    ease-in-out
  `;

  // Determine variant-specific classes
  const variantClasses = useMemo(() => {
    switch (variant) {
      case 'filled':
        return `
          bg-gray-100
          border
          border-transparent
          focus:bg-white
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-500/20
          dark:bg-gray-700
          dark:text-gray-100
          dark:focus:bg-gray-600
          dark:focus:border-blue-400
          dark:focus:ring-blue-400/20
        `;
      case 'ghost':
        return `
          bg-transparent
          border
          border-transparent
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-500/20
          dark:text-gray-100
          dark:focus:border-blue-400
          dark:focus:ring-blue-400/20
        `;
      case 'outlined':
      default:
        return `
          bg-white
          border
          border-gray-300
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-500/20
          dark:bg-gray-800
          dark:border-gray-600
          dark:text-gray-100
          dark:focus:border-blue-400
          dark:focus:ring-blue-400/20
        `;
    }
  }, [variant]);

  // Determine size-specific classes
  const sizeClasses = useMemo(() => {
    switch (size) {
      case 'sm':
        return 'text-sm h-9';
      case 'lg':
        return 'text-lg h-14';
      case 'md':
      default:
        return 'text-base h-11';
    }
  }, [size]);

  // Determine error/disabled classes
  const stateClasses = useMemo(() => {
    if (disabled) {
      return 'opacity-50 cursor-not-allowed bg-gray-50 dark:bg-gray-700';
    }
    if (invalid) {
      return 'border-red-500 focus:border-red-500 focus:ring-red-500/20 dark:border-red-400 dark:focus:border-red-400 dark:focus:ring-red-400/20';
    }
    return '';
  }, [disabled, invalid]);

  // Handle the clear button functionality
  const handleClear = () => {
    onChange({
      target: { value: '' } as any,
    } as ChangeEvent<HTMLInputElement>);
  };

  // Handle focus events
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const isPassword = type === 'password';
  const showClearButton = value && !disabled && !isPassword;
  const inputType = isPassword && !showPassword ? 'password' : 'text';

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className={`text-sm font-medium transition-colors duration-200 ${
          invalid 
            ? 'text-red-600 dark:text-red-400' 
            : 'text-gray-700 dark:text-gray-300'
        }`}>
          {label}
        </label>
      )}
      <div className="relative">
        <input
          className={`${baseClasses} ${variantClasses} ${sizeClasses} ${stateClasses} pr-10`}
          type={inputType}
          value={value as string}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={invalid}
        />
        {isPassword && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.75 9.75 0 0 0 5.46-1.52"></path>
                <line x1="2" x2="22" y1="2" y2="22"></line>
              </svg>
            )}
          </button>
        )}
        {showClearButton && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
            onClick={handleClear}
            tabIndex={-1}
            aria-label="Clear input"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="m15 9-6 6"></path>
              <path d="m9 9 6 6"></path>
            </svg>
          </button>
        )}
      </div>
      {helperText && !errorMessage && (
        <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-200">
          {helperText}
        </p>
      )}
      {errorMessage && (
        <p className="text-xs text-red-500 dark:text-red-400 transition-colors duration-200">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
