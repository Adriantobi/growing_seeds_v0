"use client";
import { DetailTransaction } from "@/components/detail-transaction";
import { SmallButton } from "@/components/ui/buttons/small-button";
import { BarGraph } from "@/components/kpis/bar-graph";
import { LineGraph } from "@/components/kpis/line-graph";
import { Table } from "@/components/ui/table/table";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Suspense, useState } from "react";
import {
  Bar,
  BarChart,
  Legend,
  Line,
  LineChart,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useUserStore from "@/stores/user-store";

export default function Dashboard() {
  const { user } = useUserStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const chartData = [
    { month: "January", partnership: 186, offerings: 80 },
    { month: "February", partnership: 305, offerings: 200 },
    { month: "March", partnership: 237, offerings: 120 },
    { month: "April", partnership: 73, offerings: 190 },
    { month: "May", partnership: 209, offerings: 130 },
    { month: "June", partnership: 214, offerings: 140 },
    {
      month: "July",
      partnership: 432,
      offerings: 230,
    },
    {
      month: "August",
      partnership: 345,
      offerings: 200,
    },
    {
      month: "September",
      partnership: 234,
      offerings: 120,
    },
    {
      month: "October",
      partnership: 123,
      offerings: 90,
    },
    {
      month: "November",
      partnership: 821,
      offerings: 923,
    },
    {
      month: "December",
      partnership: 323,
      offerings: 210,
    },
  ];

  const lineData = [
    { month: "January", partnership: 186, offerings: 80 },
    { month: "February", partnership: 305, offerings: 200 },
    { month: "March", partnership: 237, offerings: 120 },
    { month: "April", partnership: 73, offerings: 190 },
    { month: "May", partnership: 209, offerings: 130 },
    { month: "June", partnership: 214, offerings: 140 },
    {
      month: "July",
      partnership: 432,
      offerings: 230,
    },
    {
      month: "August",
      partnership: 345,
      offerings: 200,
    },
    {
      month: "September",
      partnership: 234,
      offerings: 120,
    },
    {
      month: "October",
      partnership: 123,
      offerings: 90,
    },
    {
      month: "November",
      partnership: 821,
      offerings: 923,
    },
    {
      month: "December",
      partnership: 323,
      offerings: 210,
    },
  ];
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between w-full sticky top-0 py-3 bg-[#121212] z-10">
        <span>
          Hey, {user?.name}!
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
        <div className="flex col-span-2 bg-zinc-800 bg-opacity-50 h-auto rounded-2xl p-4">
          <div className="flex flex-col w-full gap-4">
            <div className="flex w-full items-center justify-between">
              <div className="flex flex-col gap-2">
                <span className="text-sm">Balance</span>
                <span className="flex gap-1">
                  <p className="text-zinc-500">
                    {user.church?.currency || user.church?.zone.currency}
                  </p>
                  <h3 className="text-3xl">89,643.02</h3>
                </span>
              </div>
              <div>
                <SmallButton
                  className="bg-white text-black"
                  onClick={() => setIsModalOpen(true)}
                >
                  Add payment
                </SmallButton>
              </div>
            </div>
            <BarGraph
              data={chartData}
              xKey="month"
              yKey="partnership"
              barKey="partnership"
            />
          </div>
        </div>
        <div className="flex col-span-1 bg-zinc-800 bg-opacity-50 h-80 rounded-2xl p-4">
          <div className="flex flex-col w-full gap-4">
            <div className="grid grid-cols-2 w-full">
              <div className="flex flex-col gap-2">
                <span className="text-sm">Cashflow</span>
                <span className="flex gap-1">
                  <p className="text-zinc-500">
                    {user.church?.currency || user.church?.zone.currency}
                  </p>
                  <h3 className="text-3xl">8,643.42</h3>
                </span>
              </div>
              <div className="flex items-start justify-end">
                <SmallButton
                  className="bg-transparen text-zinc-500"
                  onClick={() => setIsModalOpen(true)}
                >
                  View more
                </SmallButton>
              </div>
            </div>
          </div>
        </div>
        <div className="flex col-span-3 bg-zinc-800 bg-opacity-50 h-80 rounded-2xl p-4">
          <div className="flex flex-col w-full gap-4">
            <div className="flex w-full items-center justify-between">
              <span className="text-sm">Giving Activity</span>
              <div>
                <SmallButton className="bg-white text-black" onClick={() => {}}>
                  Filters
                </SmallButton>
              </div>
            </div>
            <LineGraph
              data={lineData}
              xKey="month"
              line1="partnership"
              line2="offerings"
            />
          </div>
        </div>
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
