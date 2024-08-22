import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { NextAuthProvider } from "../Providers";
import AuthWrapper from "../AuthWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Growing Seeds",
  description: "Growing Seeds web app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <AuthWrapper>{children}</AuthWrapper>
        </NextAuthProvider>
      </body>
    </html>
  );
}
