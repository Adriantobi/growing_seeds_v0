import { createMember } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  const contentType = req.headers.get("content-type");
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
    photo,
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

  const data = {
    firstName,
    lastName: lastName || null,
    photo: photo || null,
    memberId,
    churchId: "clziqkjpt00019o24f799nodp",
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
    console.log(data);
    const newMember = await createMember(data);
    return NextResponse.json(
      { message: "Member successfully created" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
