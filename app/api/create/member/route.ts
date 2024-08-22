import {
  checkAuthValidity,
  createMember,
  getChurchByEmail,
} from "@/lib/queries";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const session = await getServerSession();
  const contentType = req.headers.get("content-type");
  const authorization = req.headers.get("authorization");

  if (authorization) {
    const validity = await checkAuthValidity(
      session?.user?.email!,
      authorization,
    );
    if (!validity) {
      return NextResponse.json(
        { error: "Invalid authorization token" },
        { status: 401 },
      );
    }
  }

  if (!authorization) {
    return NextResponse.json(
      { error: "Authorization token is required" },
      { status: 401 },
    );
  }

  if (contentType !== "application/json") {
    return NextResponse.json(
      { error: "Invalid content type" },
      { status: 415 },
    );
  }

  const body = await req.json();
  const {
    firstName,
    lastName,
    image,
    memberId,
    birthDate,
    email,
    phone,
    address,
    country,
    state,
    city,
    postalCode,
    department,
  } = body;

  if (!firstName || !memberId) {
    return NextResponse.json(
      { error: "First Name and Member ID are required" },
      { status: 400 },
    );
  }

  const churchId = await getChurchByEmail(session?.user?.email!);

  const data = {
    firstName,
    lastName: lastName || null,
    image: image || null,
    memberId,
    churchId: churchId!,
    birthDate: birthDate || null,
    email: email || null,
    phone: phone || null,
    address: address || null,
    country: country || null,
    state: state || null,
    city: city || null,
    postalCode: postalCode || null,
    department: department || null,
  };
  try {
    const newMember = await createMember(data);
    return NextResponse.json(
      { message: "Member successfully created" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
