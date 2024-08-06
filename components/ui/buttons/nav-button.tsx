import Link from "next/link";

interface NavButtonProps {
  href: string;
  active: boolean;
  children?: React.ReactNode;
}
export function NavButton({ href, active, children }: NavButtonProps) {
  return (
    <Link
      href={href}
      className={`flex cursor-pointer items-center gap-2 rounded-lg ${active ? "bg-zinc-800 bg-opacity-50" : ""} px-2 py-1.5 text-sm`}
    >
      {children}
    </Link>
  );
}
