import { ChevronDownIcon, Trash2Icon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface OptionInputProps {
  uniqueId: number;
  remove?: (value: number) => void;
  name?: string;
  textPlaceholder: string;
  optionsPlaceholder: string;
  currencySymbol?: string;
  type: "string" | "number" | "currency";
  options: any[];
  dropdownPosition?: "above" | "below";
}

export default function OptionInput({
  uniqueId,
  remove,
  optionsPlaceholder,
  textPlaceholder,
  options,
  currencySymbol,
  type,
  name,
  dropdownPosition = "below",
}: OptionInputProps) {
  const [option, setOption] = useState(null);
  const [text, setText] = useState("");
  const [dropdown, setDropdown] = useState(false);
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
    type === "number" ? { inputMode: "numeric" as "numeric", min: 0 } : {};

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
          className="flex gap-1 text-sm items-center px-4 py-2 cursor-pointer border-r border-zinc-800 text-center whitespace-nowrap"
          onClick={() => setDropdown(!dropdown)}
        >
          {option === null ? optionsPlaceholder : optionDisplay}
          <ChevronDownIcon width={20} height={20} strokeWidth={1.5} />
        </span>

        <span className="w-full px-4 py-2 flex justify-center items-center gap-0.5">
          {type === "currency" && currencySymbol}
          <input
            placeholder={textPlaceholder}
            className="bg-transparent outline-none w-full text-zinc-600 placeholder-zinc-600"
            type={inputType}
            onChange={(event) => setText(event.target.value)}
            {...inputProps}
          />
        </span>
        {remove ? (
          <span
            onClick={() => remove(uniqueId)}
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
        className={`rounded-lg z-10 flex-col overflow-hidden absolute ${dropdownPosition === "below" ? "top-[46px]" : "bottom-[46px]"} ${dropdown ? "flex" : "hidden"}`}
      >
        <ul>
          {options.map((current, index) => (
            <li
              className={`px-4 py-2 bg-zinc-800 hover:bg-zinc-900 cursor-pointer ${option === current ? "bg-zinc-900" : "bg-zinc-800"} ${highlightedIndex === index ? "bg-zinc-700" : ""}`}
              key={current}
              onClick={() => setOption(current)}
            >
              {type === "number" && currencySymbol}
              {current}
            </li>
          ))}
        </ul>
      </div>
      {name && (
        <input
          className="hidden"
          value={`${option}|108|${text}`}
          name={`${name}${uniqueId || 0}`}
        />
      )}
    </span>
  );
}
