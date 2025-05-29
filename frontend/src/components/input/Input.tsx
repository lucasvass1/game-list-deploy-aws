import React from "react";
import { InputStyles, Label } from "./styles";

interface InputProps {
  label: string;
  placeholder: string;
  type?: string;
  name: string;
  value: string;
  onChange: (e) => void;
  error?: string;
}

export function Input({
  label,
  placeholder,
  type = "text",
  name,
  value,
  onChange,
  error,
}: InputProps) {
  return (
    <div className={"reset"}>
      {label && <Label htmlFor={name}>{label}</Label>}
      <InputStyles
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
