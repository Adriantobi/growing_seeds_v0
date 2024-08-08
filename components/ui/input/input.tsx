import React from "react";

interface InputProps {
  type: string;
  value?: any;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  required?: boolean;
  defaultValue?: string;
}

export default function Input({
  type,
  disabled,
  value,
  placeholder,
  className,
  name,
  required,
  defaultValue,
  onChange,
}: InputProps) {
  return (
    <div
      className={`rounded-lg border border-zinc-800 bg-zinc-800 bg-opacity-50 hover:bg-opacity-70 text-sm ${className}`}
    >
      <input
        placeholder={placeholder}
        className="bg-transparent outline-none px-4 py-2 w-full text-zinc-600 placeholder-zinc-600"
        type={type}
        name={name}
        value={value}
        disabled={disabled}
        required={required}
        onChange={onChange}
        defaultValue={defaultValue}
      />
    </div>
  );
}
