import { ChevronDownIcon, Trash2Icon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface BigOptionProps {
  uniqueId?: number;
  remove?: (value: number) => void;
  placeholder: string;
  currencySymbol?: string;
  type: "string" | "number" | "currency";
  options: any[];
  allowTyping?: boolean;
  dropdownPosition?: "above" | "below";
  onChange?: (value: any) => void;
  name?: string;
}

export default function BigOption({
  uniqueId,
  remove,
  placeholder,
  options,
  currencySymbol,
  type,
  allowTyping,
  onChange,
  name,
  dropdownPosition = "below",
}: BigOptionProps) {
  const [option, setOption] = useState(null);
  const [dropdown, setDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const dropdownRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setDropdown(false);
  }, [option]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event?.target as HTMLSpanElement)
      ) {
        setDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  useEffect(() => {
    if (dropdown) {
      const handleKeyDown = (event: KeyboardEvent) => {
        switch (event.key) {
          case "ArrowUp":
            setHighlightedIndex((prevIndex) =>
              prevIndex > 0 ? prevIndex - 1 : options.length - 1,
            );
            break;
          case "ArrowDown":
            setHighlightedIndex((prevIndex) =>
              prevIndex < options.length - 1 ? prevIndex + 1 : 0,
            );
            break;
          case "Enter":
            const selectedOption = options[highlightedIndex];
            setOption(selectedOption);
            setSearchTerm(selectedOption);
            setDropdown(false);
            break;
          default:
            break;
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [dropdown, options, highlightedIndex]);

  const inputType = type === "currency" ? "number" : type;
  const inputProps =
    type === "number"
      ? { inputMode: "numeric" as "numeric", min: 0 }
      : { disabled: !allowTyping };

  const optionDisplay =
    type === "number" && option !== null
      ? `${currencySymbol || ""}${option}`
      : option;

  return (
    <span
      className="w-full text-sm rounded-lg flex flex-col relative gap-2"
      ref={dropdownRef}
    >
      <div className="w-full border border-zinc-800 bg-zinc-800 bg-opacity-50 hover:bg-opacity-70 text-sm rounded-lg flex relative">
        <span
          className="flex justify-between text-sm items-center px-4 py-2 cursor-pointer w-full text-center whitespace-nowrap"
          onClick={() => setDropdown(!dropdown)}
        >
          {type === "currency" && currencySymbol}
          <input
            placeholder={placeholder}
            value={searchTerm}
            name={name}
            className="bg-transparent outline-none w-full text-zinc-600 placeholder-zinc-600"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setDropdown(true);
            }}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              onChange && onChange(e.target.value);
            }}
            type={inputType}
            {...inputProps}
          />
          <ChevronDownIcon
            width={20}
            height={20}
            strokeWidth={1.5}
            className={`${dropdown ? "-rotate-180" : ""} transform transition-transform`}
          />
        </span>

        {remove ? (
          <span
            onClick={() => {
              uniqueId && remove(uniqueId);
            }}
            className="flex justify-center items-center p-2 cursor-pointer group"
          >
            <Trash2Icon
              width={16}
              height={16}
              strokeWidth={1.5}
              className="group-hover:stroke-red-400"
            />
          </span>
        ) : null}
      </div>

      <div
        className={`rounded-lg z-10 w-full flex-col overflow-hidden absolute ${dropdownPosition === "below" ? "top-[46px]" : "bottom-[46px]"} ${dropdown ? "flex" : "hidden"}`}
      >
        <ul>
          {options.map((current, index) => (
            <li
              className={`px-4 py-2 bg-zinc-800 hover:bg-zinc-900 cursor-pointer ${option === current ? "bg-zinc-900" : "bg-zinc-800"} ${highlightedIndex === index ? "bg-zinc-700" : ""}`}
              key={current}
              onClick={() => {
                setOption(current);
                setSearchTerm(current);
              }}
            >
              {type === "number" && currencySymbol}
              {current}
            </li>
          ))}
        </ul>
      </div>
    </span>
  );
}
