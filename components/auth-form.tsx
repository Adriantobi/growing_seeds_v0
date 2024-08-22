"use client";
import { Google } from "iconic-react";
import { TriangleAlertIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "./ui/input/input";
import { FetchBigOptions } from "./ui/input/fetch-big-options";
import { BigButton } from "./ui/buttons/big-button";

interface AuthFormProps {
  variant: "register" | "login";
  options?: any[];
}
export function AuthForm({ variant, options }: AuthFormProps) {
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    if (variant === "register") {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (response.ok) {
        await signIn("credentials", {
          email: data?.email,
          password: data?.password,
          redirect: true,
        });
      } else {
        setError(res.error);
      }
    } else {
      const response = await signIn("credentials", {
        email: data?.email,
        password: data?.password,
        redirect: true,
      });
      if (response?.error) {
        setError("Invalid credentials");
      }
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label className="text-muted-foreground text-sm" htmlFor="email">
            Email
          </label>
          <Input type="email" placeholder="Email" name="email" />
        </div>
        {variant === "register" && (
          <div className="flex flex-col gap-2">
            <label className="text-muted-foreground text-sm" htmlFor="name">
              Name
            </label>
            <Input type="text" placeholder="Name" name="name" />
          </div>
        )}
        {variant === "register" && (
          <div className="flex flex-col gap-2">
            <label className="text-muted-foreground text-sm" htmlFor="church">
              Select Church
            </label>
            <FetchBigOptions
              placeholder="Select Church"
              name="church"
              options={options!}
              limit={10}
            />
          </div>
        )}
        <div className="flex flex-col gap-2">
          <label className="text-muted-foreground text-sm" htmlFor="password">
            Password
          </label>
          <Input type="password" placeholder="Password" name="password" />
        </div>
        {variant === "register" && (
          <div className="flex flex-col gap-2">
            <label
              className="text-muted-foreground text-sm"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <Input
              type="password"
              placeholder="Password"
              name="confirmPassword"
            />
          </div>
        )}
        {error && (
          <div className="flex gap-4 border border-red-400 text-red-400 bg-red-600 bg-opacity-15 text-sm rounded-lg items-center px-4 py-2">
            <TriangleAlertIcon
              size={20}
              strokeWidth={1.5}
              className="stroke-red-400"
            />
            {error}
          </div>
        )}
        <BigButton className="bg-green-500 hover:bg-green-700">
          {variant === "register" ? "Register" : "Login"}
        </BigButton>
        <div className="flex flex-gap items-center">
          <div className="w-full h-[1px] bg-zinc-800"></div>
          <div className="whitespace-nowrap text-sm px-2">Or continue with</div>
          <div className="w-full h-[1px] bg-zinc-800"></div>
        </div>
      </form>
      <div className="flex gap-2 w-full">
        <BigButton
          className="w-full border border-zinc-800 bg-zinc-800"
          onClick={() => signIn("google")}
        >
          <Google size={"16"} variant="Bold" /> Google
        </BigButton>
        <BigButton
          className="w-full border border-zinc-800 bg-zinc-800"
          onClick={() => signIn("github")}
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 16 16"
            height="16"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
          </svg>{" "}
          Github
        </BigButton>
      </div>
    </div>
  );
}
