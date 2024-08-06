"use client";
import { Table } from "@/components/table/table";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";

function cuid() {
  const base = "0123456789abcdefghijklmnopqrstuvwxyz";
  let timestamp = new Date().getTime().toString(36);
  let counter = (Math.random() * 1679615).toString(36); // Random counter value
  counter = "000000" + counter; // Pad with leading zeros
  counter = counter.slice(-4); // Get the last four characters
  let fingerprint = "0000" + (Math.random() * 1679615).toString(36); // Random fingerprint
  fingerprint = fingerprint.slice(-4); // Get the last four characters
  let random = "";
  for (let i = 0; i < 4; i++) {
    random += base.charAt(Math.floor(Math.random() * base.length));
  }
  return `c${timestamp}${counter}${fingerprint}${random}`;
}

function generateMembersData(count: number) {
  // Helper function to get random elements from an array
  function getRandomElement(arr: any[]) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // Sample data for generating random members
  const names = ["Jane Doe", "John Doe", "Miguel Smith", "Thomas Clark"];
  const images = [
    "https://randomuser.me/api/portraits/women/21.jpg",
    "https://randomuser.me/api/portraits/men/34.jpg",
    "https://randomuser.me/api/portraits/men/12.jpg",
    "https://randomuser.me/api/portraits/men/45.jpg",
  ];

  // Function to generate a random date string
  function getRandomDate() {
    const start = new Date(2023, 0, 1);
    const end = new Date();
    const randomDate = new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime()),
    );
    const options: any = { year: "numeric", month: "short", day: "numeric" };
    return randomDate.toLocaleDateString("en-US", options);
  }

  // Function to generate a random time string
  function getRandomTime() {
    const hours = Math.floor(Math.random() * 12) + 1;
    const minutes = Math.floor(Math.random() * 60)
      .toString()
      .padStart(2, "0");
    const ampm = Math.random() > 0.5 ? "AM" : "PM";
    return `${hours}:${minutes} ${ampm}`;
  }

  // Generate the members data
  const membersData = [];
  for (let i = 0; i < count; i++) {
    const name = getRandomElement(names);
    const memberId = (i + 1).toString().padStart(4, "0"); // Generate memberId as a zero-padded number
    const member = {
      id: cuid(),
      name,
      image: images[names.indexOf(name)],
    };
    const createdDate = getRandomDate();
    const time = getRandomTime();

    membersData.push({
      member,
      createdDate,
      time,
      memberId,
    });
  }

  return membersData;
}

export default function Members() {
  const [members, setMembers] = useState<any>([]);
  useEffect(() => {
    setMembers(generateMembersData(25));
  }, []);
  return (
    <div className="flex h-full max-h-[calc(100vh-12px)]">
      <Table
        headers={["createdDate", "member", "memberId"]}
        data={members}
        templates={{
          member: (member) => (
            <Link
              href={`/member/${member.id}`}
              className="flex gap-2 items-center"
            >
              <div className="w-6 aspect-square overflow-hidden rounded-full">
                <Suspense
                  fallback={
                    <div className="w-6 h-6 bg-zinc-800 rounded-full animate-pulse"></div>
                  }
                >
                  <Image
                    src={member.image}
                    width={0}
                    height={0}
                    alt={member.name}
                    sizes="100vw"
                    quality={100}
                    className="object-cover w-full h-full"
                  />
                </Suspense>
              </div>
              <span>{member.name}</span>
            </Link>
          ),
          createdDate: (createdDate, time) => (
            <span>
              {createdDate},&nbsp;<span className="text-zinc-500">{time}</span>
            </span>
          ),
          memberId: (memberId) => (
            <span className="flex flex-nowrap items-center px-2.5 py-1 border border-zinc-800 rounded-full w-fit text-xs">
              <p className="text-zinc-500 text-opacity-70">#CEWA</p>
              {memberId}
            </span>
          ),
        }}
      />
    </div>
  );
}
