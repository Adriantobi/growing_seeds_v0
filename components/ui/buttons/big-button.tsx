interface BigButtonProps {
  children?: React.ReactNode;
  onClick?: (e?: any) => void;
  position?: "center" | "left" | "right";
  className?: string;
  disabled?: boolean;
  type?: "submit" | "reset" | "button" | undefined;
}
export function BigButton({
  onClick,
  position = "center",
  className = "border border-zinc-800 bg-zinc-800",
  children,
  disabled,
  type,
}: BigButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${className} bg-opacity-50 hover:bg-opacity-70 gap-1 text-sm flex rounded-lg px-4 py-2 ${
        position === "center"
          ? "justify-center"
          : position === "left"
            ? "justify-start"
            : "justify-end"
      } items-center cursor-pointer`}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
}
