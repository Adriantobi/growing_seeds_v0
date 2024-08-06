"use client";
import { CreateTransaction } from "@/components/create-transaction";
import { SmallButton } from "@/components/ui/buttons/small-button";
import { Table } from "@/components/ui/table/table";
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
  const [transactions, setTransactions] = useState<any>([]);
  const [createTransaction, setCreateTransaction] = useState(false);
  useEffect(() => {
    setTransactions(generateTransactionData(25));
  }, []);
  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-12px)]">
      <div className="flex justify-between w-full sticky top-0 py-3 bg-[#121212]">
        <span>Transaction</span>
        <div className="flex gap-2 items-center">
          <SmallButton onClick={() => setCreateTransaction(true)}>
            Create Transaction
          </SmallButton>
          <SmallButton
            className="bg-red-500 hover:bg-red-600 text-white"
            onClick={() => setCreateTransaction(true)}
          >
            Delete All
          </SmallButton>
        </div>
      </div>
      <Table
        headers={[
          "date",
          "status",
          "member",
          "amount",
          "category",
          "paymentMethod",
        ]}
        data={transactions}
        templates={{
          member: (member) => (
            <Link
              href={`/member/${member?.id || "0"}`}
              className="flex gap-2 items-center"
            >
              <div className="w-6 aspect-square overflow-hidden rounded-full">
                <Suspense
                  fallback={
                    <div className="w-6 h-6 bg-zinc-800 rounded-full animate-pulse"></div>
                  }
                >
                  {member && member?.image! && (
                    <Image
                      src={member?.image!}
                      width={0}
                      height={0}
                      alt={member?.name!}
                      sizes="100vw"
                      quality={100}
                      className="object-cover w-full h-full"
                    />
                  )}
                </Suspense>
              </div>
              <span>{member?.name! || ""}</span>
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
      <CreateTransaction
        isOpen={createTransaction}
        onClose={() => setCreateTransaction(false)}
      />
    </div>
  );
}
