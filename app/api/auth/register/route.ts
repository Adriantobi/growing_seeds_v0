import {
  createUser,
  getChurchId,
  getUserByEmail,
  isChurchValid,
} from "@/lib/queries";
import { hashPassword } from "@/lib/password-utils";
import { NextRequest, NextResponse } from "next/server";
import { generateSecureString } from "@/lib/auth-utils";

export async function POST(req: NextRequest) {
  const contentType = req.headers.get("content-type");
  if (contentType !== "application/json") {
    return new Response("Invalid content type", { status: 415 });
  }
  const body = await req.json();
  const { name, email, church, password, confirmPassword } = body;
  if (!name || !email || !password || !confirmPassword || !church) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 },
    );
  }
  if (await getUserByEmail(email)) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }
  if (password !== confirmPassword) {
    return NextResponse.json(
      { error: "Passwords do not match" },
      { status: 400 },
    );
  }
  if ((await isChurchValid(church)) === false) {
    return NextResponse.json({ error: "Invalid church" }, { status: 400 });
  }
  const data = {
    name: name,
    email: email,
    authToken: generateSecureString(),
    churchId: (await getChurchId(church)) || "0",
    password: hashPassword(password),
  };

  try {
    const user = await createUser(data);
    return NextResponse.json(
      { message: "User successfully created" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
