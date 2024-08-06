import React from "react";

interface InputProps {
  type: string;
  placeholder?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  required?: boolean;
}

export default function Input({
  type,
  placeholder,
  className,
  name,
  required,
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
        required={required}
        onChange={onChange}
      />
    </div>
  );
}
