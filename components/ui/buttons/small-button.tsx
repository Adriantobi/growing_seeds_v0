interface SmallButtonProps {
  children?: React.ReactNode;
  onClick: () => void;
  className?: string;
}

export function SmallButton({
  onClick,
  className = "bg-zinc-800 bg-opacity-50",
  children,
}: SmallButtonProps) {
  return (
    <span
      className={`${className} hover:bg-opacity-70 rounded-lg p-2 font-semibold text-xs cursor-pointer`}
      onClick={onClick}
    >
      {children}
    </span>
  );
}
