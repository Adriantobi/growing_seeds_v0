"use client";
import { CreateMember } from "@/components/create-member";
import { SmallButton } from "@/components/ui/buttons/small-button";
import { Table } from "@/components/ui/table/table";
import { getMembersWithPagination } from "@/lib/queries";
import useUserStore from "@/stores/user-store";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";

export default function Members() {
  const [members, setMembers] = useState([]);
  const [createMember, setCreateMember] = useState(false);
  const { user } = useUserStore();

  useEffect(() => {
    fetch("/api/fetch/members", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${user?.authToken}`,
      },
      body: JSON.stringify({ pageNumber: 1, pageSize: 25 }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMembers(data);
      });
  }, [user?.authToken]);

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-12px)]">
      <div className="flex justify-between w-full sticky top-0 py-3 bg-[#121212]">
        <span>Members</span>
        <div className="flex gap-2 items-center">
          <SmallButton onClick={() => setCreateMember(true)}>
            Create Member
          </SmallButton>
          <SmallButton
            className="bg-red-500 hover:bg-red-600 text-white"
            onClick={() => setCreateMember(true)}
          >
            Delete All
          </SmallButton>
        </div>
      </div>
      <Table
        headers={[
          { name: "created date", value: "createdDate" },
          { name: "Member", value: "firstName" },
          { name: "Member ID", value: "memberId" },
        ]}
        data={members}
        pagination={{
          totalPages: 4,
          onPageChange: (page) => console.log(page),
          currentPage: 1,
          totalRows: 100,
        }}
        templates={{
          firstName: ({ firstName, lastName, image, memberId }) => (
            <Link
              href={`/member/${memberId || "0"}`}
              className="flex gap-2 items-center"
            >
              <div className="w-6 aspect-square overflow-hidden rounded-full">
                <Suspense
                  fallback={
                    <div className="w-6 h-6 bg-zinc-800 rounded-full animate-pulse"></div>
                  }
                >
                  <Image
                    src={image || "/images/avatar.jpg"}
                    width={0}
                    height={0}
                    alt={`${firstName} ${lastName || ""}`}
                    sizes="100vw"
                    quality={100}
                    className="object-cover w-full h-full"
                  />
                </Suspense>
              </div>
              <span>{`${firstName} ${lastName || ""}` || ""}</span>
            </Link>
          ),
          createdDate: ({ createdAt }) => {
            const date = new Date(createdAt);
            const createdDate = date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            });
            const time = date.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            });
            return (
              <span>
                {createdDate},&nbsp;
                <span className="text-zinc-500">{time}</span>
              </span>
            );
          },
          memberId: ({ memberId }) => (
            <span className="flex flex-nowrap items-center px-2.5 py-1 border border-zinc-800 rounded-full w-fit text-xs">
              <p className="text-zinc-500 text-opacity-70">#CEWA</p>
              {memberId}
            </span>
          ),
        }}
      />
      <CreateMember
        isOpen={createMember}
        onClose={() => setCreateMember(false)}
      />
    </div>
  );
}
