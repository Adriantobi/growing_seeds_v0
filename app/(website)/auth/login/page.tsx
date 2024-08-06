import Link from "next/link";

import { Metadata } from "next";

import { AuthForm } from "../../../../components/auth-form";
import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default function Login() {
  return (
    <div
      style={{
        background:
          "linear-gradient(to bottom, hsl(var(--background)) 10%, transparent 80%)",
      }}
      className="h-screen w-screen bg-gradient-to-b from-background to-transparent flex items-center justify-center"
    >
      <div className="container flex h-screen w-screen flex-col items-center justify-center">
        <Link
          href="/"
          className="absolute left-4 top-4 md:left-8 md:top-8 flex items-center text-sm"
        >
          <ChevronLeftIcon className="mr-2 h-4 w-4" />
          Back
        </Link>
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <Image
              width={0}
              height={0}
              sizes="100vw"
              src="/favicon.png"
              alt="Growing Seeds Logo"
              className="mx-auto h-12 w-12"
            />
            <h1 className="text-xl font-semibold tracking-tight">
              Login to Growing Seeds
            </h1>
            <p className="text-sm text-zinc-500">
              Ready to tackle church finances? Just sign in below.
            </p>
          </div>
          <AuthForm variant="login" />
          <p className="px-8 text-center text-sm text-muted-foreground">
            <Link
              href="/auth/register"
              className="hover:text-brand underline underline-offset-4"
            >
              Don&apos;t have an account? Sign Up
            </Link>
          </p>
        </div>{" "}
      </div>
    </div>
  );
}
