import { checkAuthValidity, updateUserImageByEmail } from "@/lib/queries";
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
  const { email, imageUrl, imagePath } = body;

  if (!email || !imageUrl || !imagePath) {
    return NextResponse.json(
      { error: "Email, image URL and image name are required" },
      { status: 400 },
    );
  }

  try {
    const upload = await updateUserImageByEmail(email, imageUrl, imagePath);
    return NextResponse.json(
      { message: "Image uploaded successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}
