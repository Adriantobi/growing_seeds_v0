"use client";
import {
  Home,
  MessageQuestion,
  Profile,
  Profile2User,
  SearchNormal1,
  Setting2,
  Tag,
} from "iconic-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronsUpDownIcon, LogOutIcon, ZapIcon } from "lucide-react";
import packageInfo from "../package.json";
import { signOut } from "next-auth/react";
import { AccountDetails } from "./account-details";
import { NavButton } from "./ui/buttons/nav-button";
import useUserStore from "@/stores/user-store";

export function SideBar() {
  const { user } = useUserStore();
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [expanded, setExpanded] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const setExpandedRef = useRef<HTMLSpanElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    setCurrentPage(pathname.slice(1) || "dashboard");
  }, [pathname]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (
        expanded &&
        profileRef.current &&
        setExpandedRef.current &&
        !profileRef.current.contains(event.target as Node) &&
        !setExpandedRef.current.contains(event.target as Node)
      ) {
        setExpanded(false);
      }
    }

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [expanded]);

  return (
    <>
      <div className="sticky left-0 top-0 flex h-[100vh] w-full max-w-72 flex-col p-2">
        <div className="flex h-full flex-col justify-between">
          <div className="flex flex-col gap-4">
            <span className="relative flex flex-col">
              <div className="flex w-full items-center justify-between rounded-xl border-[1.5px] border-zinc-800 bg-zinc-800 bg-opacity-30 p-2">
                <span className="flex items-center gap-3">
                  <span className="h-10 w-10 rounded-lg overflow-hidden aspect-square">
                    <Image
                      src={user?.image || "/images/avatar.jpg"}
                      width={0}
                      height={0}
                      alt="Adrian Tobi"
                      sizes="100vw"
                      className="object-cover w-full h-full"
                    />
                  </span>
                  <span className="flex-col">
                    <h1 className="text-sm">{user?.name}</h1>
                    <p className="text-xs">{user?.email}</p>
                  </span>
                </span>
                <span
                  className="p-2 cursor-pointer"
                  onClick={() => setExpanded(!expanded)}
                  ref={setExpandedRef}
                >
                  <ChevronsUpDownIcon size={"16"} />
                </span>
              </div>
              {expanded && (
                <div
                  className="absolute top-16 bg-black rounded-xl w-full p-2 flex flex-col gap-2"
                  ref={profileRef}
                >
                  <span
                    className="flex w-full px-2 py-2 hover:bg-zinc-800 bg-opacity-70 cursor-pointer items-center gap-2 text-sm rounded-lg"
                    onClick={() => {
                      setExpanded(false);
                      setUserMenu(true);
                    }}
                  >
                    <Profile size={"16"} strokeWidth={1.5} /> Account details
                  </span>
                  <span className="flex w-full px-2 py-2 hover:bg-zinc-800 bg-opacity-70 cursor-pointer items-center gap-2 text-sm rounded-lg">
                    <ZapIcon size={"16"} strokeWidth={1.5} /> Upgrade plan
                  </span>
                  <span
                    className="flex w-full px-2 py-2 hover:bg-zinc-800 bg-opacity-70 cursor-pointer items-center gap-2 text-sm rounded-lg justify-between"
                    onClick={() => signOut()}
                  >
                    <span className="flex items-center gap-2">
                      <LogOutIcon size={"16"} strokeWidth={1.5} /> Log out
                    </span>
                    <p className="text-zinc-500">v{packageInfo.version}</p>
                  </span>
                </div>
              )}
            </span>
            <div className="flex items-center justify-between rounded-lg bg-zinc-800 bg-opacity-50 px-2.5 py-2">
              <div className="flex items-center justify-center gap-3">
                <SearchNormal1 size={"16"} color="#4a4a50" />
                <input
                  type="text"
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
      <AccountDetails
        onClose={() => setUserMenu(false)}
        isOpen={userMenu}
        user={user}
      />
    </>
  );
}
