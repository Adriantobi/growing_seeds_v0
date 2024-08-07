import Link from "next/link";

import { AuthForm } from "../../../../components/auth-form";
import Image from "next/image";
import { getChurches } from "@/lib/queries";

export const metadata = {
  title: "Register",
  description: "Create an account to get started.",
};

export default async function Register() {
  const churches = await getChurches();
  return (
    <div className="container grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0 overflow-x-hidden no-scrollbar">
      <Link
        href="/auth/login"
        className="absolute right-4 top-4 md:right-8 md:top-8 px-4 py-2 dark:bg-background-secondary rounded-lg hover:bg-zinc-800 text-sm hover:bg-opacity-70"
      >
        Login
      </Link>
      <div className="hidden h-full bg-zinc-800 dark:bg-background-secondary lg:block" />
      <div className="lg:p-8">
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
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to create your account
            </p>
          </div>
          <AuthForm variant="register" options={churches} />
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking register, you agree to our{" "}
            <Link
              href="#tos"
              className="hover:text-brand underline underline-offset-4"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="#privacy"
              className="hover:text-brand underline underline-offset-4"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
