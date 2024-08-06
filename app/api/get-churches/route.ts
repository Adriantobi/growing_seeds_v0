import { getChurches } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
   const contentType = req.headers.get("content-type");
  if (contentType !== "application/json") {
    return NextResponse.json(
    { error: "Invalid content type" },
    { status: 415 },
    );
  }

  const body = await req.json();
  const { search } = body;
  if (!search) {
    return NextResponse.json(
      { error: "Search term is required" },
      { status: 400 },
    );
  }

  try {
    const response = await getChurches(search);
    return NextResponse.json(response, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
