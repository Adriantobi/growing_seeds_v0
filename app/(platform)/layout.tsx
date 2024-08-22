import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { NextAuthProvider } from "../Providers";
import AuthWrapper from "../AuthWrapper";
import { SideBar } from "@/components/side-bar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Growing Seeds",
  description: "Growing Seeds web app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <AuthWrapper>
            <div className="flex gap-8">
              <SideBar />
              <span className="mt-3 pr-8 w-full">{children}</span>
            </div>
          </AuthWrapper>
        </NextAuthProvider>
      </body>
    </html>
  );
}
