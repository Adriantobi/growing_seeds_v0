import {
  CalendarDaysIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface DatePickerProps {
  placeholder?: string;
  className?: string;
  weekdayCharLength?: number;
  name: string;
  format?: "dd/mm/yyyy" | "mm/dd/yyyy" | "yyyy/mm/dd" | "yyyy/dd/mm";
  weekStart?:
    | "Sunday"
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday";
  locale?: string;
  longFormat?: boolean;
  required?: boolean;
  minDate: string;
  maxDate?: string;
  onChange: (date: string) => void;
  position?: "top" | "bottom" | "left" | "right";
}

export function DatePicker({
  placeholder,
  className,
  name,
  required,
  minDate,
  maxDate,
  onChange,
  weekStart = "Sunday",
  weekdayCharLength = 2,
  format = "dd/mm/yyyy",
  locale = "en",
  longFormat = false,
  position = "bottom",
}: DatePickerProps) {
  const currentDate = new Date();
  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const rearrangedWeekDays = [
    ...weekDays.slice(weekDays.indexOf(weekStart)),
    ...weekDays.slice(0, weekDays.indexOf(weekStart)),
  ];
  const inputRef = useRef<HTMLInputElement>(null);
  const datePickerRef = useRef<HTMLDivElement>(null);
  const [date, setDate] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);

  function generateCalendar() {
    const calendar = [];
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0,
    ).getDate();
    const firstDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1,
    ).getDay();

    for (let i = 0; i < firstDay; i++) {
      calendar.push("");
    }

    for (let i = 1; i <= daysInMonth; i++) {
      calendar.push(i);
    }

    return calendar;
  }

  const handleDivClick = () => {
    if (inputRef.current) inputRef.current.focus();
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event?.target as HTMLDivElement)
      ) {
        setShowCalendar(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [datePickerRef]);

  return (
    <div
      ref={datePickerRef}
      onClick={() => setShowCalendar(true)}
      className="relative"
    >
      <div
        onClick={handleDivClick}
        className={`rounded-lg border border-zinc-800 bg-zinc-800 bg-opacity-50 hover:bg-opacity-70 flex items-center text-sm group ${className}`}
      >
        <span className="pl-2.5 cursor-text">
          <CalendarDaysIcon
            size={20}
            strokeWidth={1.5}
            className="stroke-zinc-600"
          />
        </span>
        <input
          ref={inputRef}
          placeholder={
            placeholder ||
            currentDate.toLocaleDateString(locale, {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })
          }
          className="bg-transparent outline-none px-2 py-2 w-full text-zinc-600 placeholder-zinc-600"
          type="text"
          name={name}
          required={required}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      {showCalendar ? (
        <span className="rounded-lg flex flex-col gap-2 border border-zinc-800 w-64 p-4 overflow-hidden bg-zinc-800 absolute top-[46px]">
          <span className="flex justify-between items-center">
            <ChevronLeftIcon
              size={20}
              strokeWidth={1.5}
              className="cursor-pointer"
            />
            <span className="text-sm px-3.5 py-1.5 rounded-lg cursor-pointer hover:bg-zinc-700 bg-opacity-50">
              {currentDate.toLocaleDateString(locale, {
                month: longFormat ? "long" : "short",
                year: "numeric",
              })}
            </span>
            <ChevronRightIcon
              size={20}
              strokeWidth={1.5}
              className="cursor-pointer"
            />
          </span>
          <div className="flex justify-between items-center">
            {rearrangedWeekDays.map((day) => (
              <span key={day} className="text-sm text-zinc-400">
                {day.slice(0, weekdayCharLength)}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {generateCalendar().map((day, index) => (
              <span
                key={index}
                className={`text-sm w-7 h-7 flex items-center justify-center rounded-md hover:bg-zinc-700 cursor-pointer`}
              >
                {day}
              </span>
            ))}
          </div>
        </span>
      ) : null}
    </div>
  );
}
