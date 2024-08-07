import { getUserByEmail } from "@/lib/queries";
import { comparePassword } from "@/lib/password-utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const contentType = req.headers.get("content-type");
  if (contentType !== "application/json") {
    return new Response("Invalid content type", { status: 415 });
  }
  const body = await req.json();
  const { email, password } = body;
  if (!email || !password) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 },
    );
  }

  const data = {
    email: email,
    password: password,
  };

  try {
    const user = await getUserByEmail(data.email);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    if (comparePassword(data.password, user?.password! || "")) {
      return NextResponse.json(
        { message: "User login successful" },
        { status: 200 },
      );
    } else {
      return NextResponse.json(
        { error: "Password is incorrect" },
        { status: 400 },
      );
    }
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
