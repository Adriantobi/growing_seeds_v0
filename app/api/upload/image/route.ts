import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { supabase } from "@/lib/db";

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const image = data.get("image") as File;
  const path = data.get("path") as string;

  try {
    const imageName = path ? `${path}/${image.name}` : image.name;
    const response = await supabase.storage
      .from("images")
      .upload(imageName, image, {
        cacheControl: "3600",
        upsert: false,
      });

    const url = supabase.storage.from("images").getPublicUrl(imageName);

    if (response.error) {
      return NextResponse.json(
        { error: response.error.message },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { message: "Image uploaded successfully", url: url.data?.publicUrl },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}
