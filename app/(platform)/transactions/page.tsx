"use client";
import { Table } from "@/components/table/table";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

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

function generateTransactionData(count: number) {
  // Helper function to get random elements from an array
  function getRandomElement(arr: any[]) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // Sample data for generating random members
  const names = [
    "Jane Doe",
    "John Doe",
    "Miguel Smith",
    "Thomas Clark",
    "Linda Johnson",
  ];
  const images = [
    "https://randomuser.me/api/portraits/women/21.jpg",
    "https://randomuser.me/api/portraits/men/34.jpg",
    "https://randomuser.me/api/portraits/men/12.jpg",
    "https://randomuser.me/api/portraits/men/45.jpg",
    "https://randomuser.me/api/portraits/women/17.jpg",
  ];
  const statuses = ["Settled", "Not Settled"];
  const categories = ["Partnership", "Offering", "Tithes"];
  const paymentMethods = ["Cheque", "Cash", "KingsPay", "Bank Transfer"];

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

  // Function to generate a random amount
  function getRandomAmount() {
    return `£${Math.floor(Math.random() * 500) + 1}`;
  }

  // Generate the members data
  const membersData = [];
  for (let i = 0; i < count; i++) {
    const name = getRandomElement(names);
    const member = {
      id: cuid(),
      name,
      image: images[names.indexOf(name)],
    };
    const amount = getRandomAmount();
    const date = getRandomDate();
    const time = getRandomTime();
    const status = getRandomElement(statuses);
    const category = getRandomElement(categories);
    const paymentMethod = getRandomElement(paymentMethods);

    membersData.push({
      member,
      amount,
      date,
      time,
      status,
      category,
      paymentMethod,
    });
  }

  return membersData;
}

export default function Transactions() {
  const [membersData, setMembersData] = useState<any>([
    {
      member: {
        name: "Jane Doe",
        image: "https://randomuser.me/api/portraits/women/21.jpg",
      },
      amount: "£500",
      date: "Nov, 02 2023",
      time: "12:00 PM",
      status: "Not Settled",
      category: "Partnership",
      paymentMethod: "Cheque",
    },
  ]);
  useEffect(() => {
    setMembersData(generateTransactionData(25));
  }, []);
  return (
    <div className="flex h-full max-h-[calc(100vh-12px)]">
      <Table
        headers={[
          "date",
          "status",
          "member",
          "amount",
          "category",
          "paymentMethod",
        ]}
        data={membersData}
        templates={{
          member: (member) => (
            <Link
              href={`/member/${member.id}`}
              className="flex gap-2 items-center"
            >
              <div className="w-6 aspect-square overflow-hidden rounded-full">
                <Image
                  src={member.image}
                  width={0}
                  height={0}
                  alt={member.name}
                  sizes="100vw"
                  quality={100}
                  className="object-cover w-full h-full"
                />
              </div>
              <span>{member.name}</span>
            </Link>
          ),
          date: (date, time) => (
            <span>
              {date},&nbsp;<span className="text-zinc-500">{time}</span>
            </span>
          ),
          status: (status) => (
            <span className="flex flex-nowrap items-center px-2.5 py-1 gap-1.5 border border-zinc-800 rounded-full w-fit">
              {status === "Settled" ? (
                <span className="bg-green-500 w-1.5 h-1.5 min-w-1.5 min-h-1.5 rounded-full"></span>
              ) : (
                <span className="bg-red-500 w-1.5 h-1.5 min-w-1.5 min-h-1.5 rounded-full"></span>
              )}
              <span className="text-xs text-nowrap">{status}</span>
            </span>
          ),
        }}
      />
    </div>
  );
}
