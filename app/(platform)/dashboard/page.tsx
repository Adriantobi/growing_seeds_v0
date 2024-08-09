"use client";
import { DetailTransaction } from "@/components/detail-transaction";
import { SmallButton } from "@/components/ui/buttons/small-button";
import { Table } from "@/components/ui/table/table";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Suspense, useState } from "react";
import { Bar, BarChart, ResponsiveContainer } from "recharts";

export default function Dashboard() {
  const { data } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
    {
      month: "July",
      desktop: 200,
      mobile: 140,
    },
    {
      month: "August",
      desktop: 200,
      mobile: 140,
    },
    {
      month: "September",
      desktop: 200,
      mobile: 140,
    },
    {
      month: "October",
      desktop: 200,
      mobile: 140,
    },
    {
      month: "November",
      desktop: 200,
      mobile: 140,
    },
    {
      month: "December",
      desktop: 200,
      mobile: 140,
    },
  ];
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between w-full sticky top-0 py-3 bg-[#121212]">
        <span>
          Hey, {data?.user?.name}!
          <p className="text-sm text-zinc-500">{currentDate}</p>
        </span>
        <div className="flex gap-2 items-center">
          <SmallButton onClick={() => setIsModalOpen(true)}>
            This month
          </SmallButton>
          <SmallButton
            className="bg-white text-black"
            onClick={() => setIsModalOpen(true)}
          >
            Add payment
          </SmallButton>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="flex col-span-2 bg-zinc-800 bg-opacity-50 h-80 rounded-2xl">
          {/*<ResponsiveContainer width="100%" height="100%">
            <BarChart width={150} height={40} data={chartData}>
              <Bar dataKey="desktop" fill="#f34a22" radius={4} />
            </BarChart>
          </ResponsiveContainer>*/}
        </div>
        <div className="flex col-span-1 bg-zinc-800 bg-opacity-50 h-80 rounded-2xl"></div>
        <div className="flex col-span-3 bg-zinc-800 bg-opacity-50 h-80 rounded-2xl"></div>
        <div className="flex col-span-3 bg-zinc-800 bg-opacity-30 h-80 rounded-2xl p-4">
          <Table
            headers={[
              "date",
              "status",
              "member",
              "amount",
              "category",
              { name: "Payment Method", value: "paymentMethod" },
            ]}
            data={[
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
              {
                member: {
                  name: "John Doe",
                  image: "https://randomuser.me/api/portraits/men/34.jpg",
                },
                amount: "£200",
                date: "Nov, 02 2023",
                time: "12:00 PM",
                status: "Settled",
                category: "Offering",
                paymentMethod: "Cash",
              },
              {
                member: {
                  name: "Miguel Smith",
                  image: "https://randomuser.me/api/portraits/men/12.jpg",
                },
                amount: "£100",
                date: "Sep, 12 2023",
                time: "09:00 AM",
                status: "Not Settled",
                category: "Partnership",
                paymentMethod: "KingsPay",
              },
              {
                member: {
                  name: "Jane Doe",
                  image: "https://randomuser.me/api/portraits/women/21.jpg",
                },
                amount: "£50",
                date: "Sep, 12 2023",
                time: "09:00 AM",
                status: "Settled",
                category: "Offering",
                paymentMethod: "Bank Transfer",
              },
              {
                member: {
                  name: "John Doe",
                  image: "https://randomuser.me/api/portraits/men/34.jpg",
                },
                amount: "£100",
                date: "Sep, 12 2023",
                time: "09:00 AM",
                status: "Settled",
                category: "Offering",
                paymentMethod: "Cheque",
              },
              {
                member: {
                  name: "Thomas Clark",
                  image: "https://randomuser.me/api/portraits/men/45.jpg",
                },
                amount: "£50",
                date: "Sep, 12 2023",
                time: "09:00 AM",
                status: "Not Settled",
                category: "Tithes",
                paymentMethod: "Cash",
              },
            ]}
            templates={{
              member: ({ member }) => (
                <div className="flex gap-2 items-center">
                  <div className="w-6 aspect-square overflow-hidden rounded-full">
                    <Suspense
                      fallback={
                        <div className="w-6 h-6 bg-zinc-800 rounded-full animate-pulse"></div>
                      }
                    >
                      {member && member.image && (
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
                  <span>{member.name || ""}</span>
                </div>
              ),
              date: ({ date, time }) => (
                <span>
                  {date},&nbsp;<span className="text-zinc-500">{time}</span>
                </span>
              ),
              status: ({ status }) => (
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
      </div>
      <DetailTransaction
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
