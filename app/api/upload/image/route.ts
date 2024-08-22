import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/db";
import { checkAuthValidity } from "@/lib/queries";
import { getServerSession } from "next-auth";

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

  if (!contentType?.includes("multipart/form-data")) {
    return NextResponse.json(
      { error: "Invalid content type" },
      { status: 415 },
    );
  }

  const data = await req.formData();
  const image = data.get("image") as File;
  const path = data.get("path");

  if (!image) {
    return NextResponse.json({ error: "Image is required" }, { status: 400 });
  }

  try {
    const imagePath = path ? `${path}/${image.name}` : image.name;
    const response = await supabase.storage
      .from("images")
      .upload(imagePath, image, {
        cacheControl: "3600",
        upsert: false,
      });

    const url = supabase.storage.from("images").getPublicUrl(imagePath);

    if (response.error) {
      return NextResponse.json(
        { error: response.error.message },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        message: "Image uploaded successfully",
        url: url.data?.publicUrl,
        image_path: imagePath,
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
