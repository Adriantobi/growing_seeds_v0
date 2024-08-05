"use client";
import {
  Home,
  MessageQuestion,
  Profile2User,
  SearchNormal1,
  Setting2,
  Tag,
} from "iconic-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NavButton } from "./buttons/nav-button";
import Image from "next/image";
import { ChevronsUpDownIcon } from "lucide-react";

export function SideBar() {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const pathname = usePathname();

  useEffect(() => {
    setCurrentPage(pathname.slice(1) || "dashboard");
  }, [pathname]);

  return (
    <div className="sticky left-0 top-0 flex h-[100vh] w-full max-w-72 flex-col p-2">
      <div className="flex h-full flex-col justify-between">
        <div className="flex flex-col gap-4">
          <div className="flex w-full items-center justify-between rounded-xl border-[1.5px] border-zinc-800 bg-zinc-800 bg-opacity-30 p-2">
            <span className="flex items-center gap-3">
              <span className="h-10 w-10 rounded-lg overflow-hidden aspect-square">
                <Image
                  src="https://v1.adriantd.com/images/adrian.jpg"
                  width={0}
                  height={0}
                  alt="Adrian Tobi"
                  sizes="100vw"
                  className="object-cover w-full h-full"
                />
              </span>
              <span className="flex-col">
                <h1 className="text-sm">Adrian Tobi</h1>
                <p className="text-xs">talktotobi@gmail.com</p>
              </span>
            </span>
            <span className="p-2 cursor-pointer">
              <ChevronsUpDownIcon size={"16"} />
            </span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-zinc-800 bg-opacity-50 px-2.5 py-2">
            <div className="flex items-center justify-center gap-3">
              <SearchNormal1 size={"16"} color="#4a4a50" />
              <input
                type="search"
                placeholder="Search"
                className="border-none bg-transparent text-sm text-zinc-600 placeholder-zinc-600 outline-none"
              ></input>
            </div>
            <span className="rounded-md bg-zinc-800 px-[7px] text-sm">/</span>
          </div>
          <div className="flex flex-col gap-2">
            <NavButton href="/dashboard" active={currentPage === "dashboard"}>
              <Home size={"16"} variant="Bold" /> Dashboard
            </NavButton>
            <NavButton href="/members" active={currentPage === "members"}>
              <Profile2User size={"16"} variant="Bold" /> Members
            </NavButton>
            <NavButton
              href="/transactions"
              active={currentPage === "transactions"}
            >
              <Tag size={"16"} variant="Bold" /> Transactions
            </NavButton>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <NavButton href="/help" active={currentPage === "help"}>
            <MessageQuestion size={"16"} variant="Bold" /> Help
          </NavButton>
          <NavButton href="/settings" active={currentPage === "settings"}>
            <Setting2 size={"16"} variant="Bold" /> Settings
          </NavButton>
        </div>
      </div>
    </div>
  );
}
