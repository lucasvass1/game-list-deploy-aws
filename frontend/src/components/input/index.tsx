import React from 'react';
import { InputStyles, Label, ErrorMessage } from './styles.ts';

interface InputProps {
  label: string;
  placeholder: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  error?: string;
}

export function Input({
  label,
  placeholder,
  type = 'text',
  name,
  value,
  onChange,
  error,
  onBlur,
  onFocus,
}: InputProps) {
  return (
    <div className={'reset'}>
      {label && <Label htmlFor={name}>{label}</Label>}
      <InputStyles
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        $hasError={!!error}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
}
