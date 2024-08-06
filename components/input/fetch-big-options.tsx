import BigOption from "./big-option";
import { Suspense, useEffect, useState } from "react";

interface BigOptionProps {
  placeholder: string;
  options: any[];
  limit?: number;
  name?: string;
}

export function FetchBigOptions({
  placeholder,
  options,
  limit = 10,
  name,
}: BigOptionProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(
    options.slice(0, limit || 10),
  );

  useEffect(() => {
    if (searchTerm) {
      setFilteredOptions(
        options.filter((option) =>
          option.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      );
    } else {
      setFilteredOptions(options);
    }
  }, [searchTerm, options]);

  return (
    <BigOption
      placeholder={placeholder}
      options={filteredOptions}
      name={name}
      allowTyping={true}
      onChange={setSearchTerm}
      type="string"
    />
  );
}
