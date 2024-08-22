"use client";
import { CreateTransaction } from "@/components/create-transaction";
import { SmallButton } from "@/components/ui/buttons/small-button";
import { Table } from "@/components/ui/table/table";
import useUserStore from "@/stores/user-store";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [createTransaction, setCreateTransaction] = useState(false);
  const { user } = useUserStore();

  useEffect(() => {
    fetch("/api/fetch/transactions", {
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
        setTransactions(data);
      });
  }, [user?.authToken]);

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
          "member",
          "amount",
          "category",
          { name: "Payment Method", value: "paymentMethod" },
        ]}
        data={transactions}
        templates={{
          member: ({ member }) => (
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
                  <Image
                    src={member?.image! || "/images/avatar.jpg"}
                    width={0}
                    height={0}
                    alt={`${member.firstName} ${member.lastName || ""}`}
                    sizes="100vw"
                    quality={100}
                    className="object-cover w-full h-full"
                  />
                </Suspense>
              </div>
              <span>
                {`${member.firstName} ${member.lastName || ""}` || ""}
              </span>
            </Link>
          ),
          date: ({ date }) => {
            const newDate = new Date(date);
            const createdDate = newDate.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            });
            const time = newDate.toLocaleTimeString("en-US", {
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
          amount: ({ amount }) => <span>£{amount}</span>,
        }}
      />
      <CreateTransaction
        isOpen={createTransaction}
        onClose={() => setCreateTransaction(false)}
      />
    </div>
  );
}
