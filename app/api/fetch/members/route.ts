import {
  checkAuthValidity,
  getChurchByEmail,
  getMembersWithPagination,
} from "@/lib/queries";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
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
  const { pageNumber, pageSize, searchTerm } = body;

  if (!pageNumber || !pageSize) {
    return NextResponse.json(
      {
        error: "Page number and page size are required fields",
      },
      {
        status: 400,
      },
    );
  }

  const churchId = await getChurchByEmail(session?.user?.email!);

  try {
    const resp = await getMembersWithPagination(
      churchId!,
      pageSize,
      pageNumber,
      searchTerm,
    );
    return NextResponse.json([...resp], { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: error as Error,
      },
      { status: 500 },
    );
  }
}
