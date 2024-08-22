import { supabase } from "@/lib/db";
import { checkAuthValidity } from "@/lib/queries";
import useUserStore from "@/stores/user-store";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
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
  const { imagePath } = body;

  if (!imagePath) {
    return NextResponse.json(
      { error: "Image path is required" },
      { status: 400 },
    );
  }

  try {
    const response = await supabase.storage.from("images").remove([imagePath]);

    if (response.error) {
      return NextResponse.json(
        { error: response.error.message },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        message: "Image removed successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message || "An unknown error occurred" },
      { status: 500 },
    );
  }
}
