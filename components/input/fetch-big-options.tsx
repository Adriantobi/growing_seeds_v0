import { useState, useEffect } from "react";
import BigOption from "./big-option";
import { Suspense } from "react";

interface BigOptionProps {
  placeholder: string;
  fallback: JSX.Element;
  fetchOptions: (args?: any) => Promise<any>;
}

export async function FetchBigOptions({
  placeholder,
  fallback,
  fetchOptions,
}: BigOptionProps) {
  const [options, setOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function optionsRefresh() {
      try {
        const data = await fetchOptions(searchTerm);
        setOptions(data);
      } catch (error) {
        console.error("Failed to fetch options:", error);
      }
    }

    optionsRefresh();
  }, [searchTerm, fetchOptions]);
  return (
    <Suspense fallback={fallback}>
      <BigOption
        placeholder={placeholder}
        options={options}
        allowTyping={true}
        type="string"
        onChange={setSearchTerm}
      />
    </Suspense>
  );
}
