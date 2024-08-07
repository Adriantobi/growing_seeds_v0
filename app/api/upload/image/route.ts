import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const photo = data.get("photo") as File;

  try {
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY!,
    );
    const response = await supabase.storage
      .from("images")
      .upload(photo.name, photo, {
        cacheControl: "3600",
        upsert: false,
      });

    const url = supabase.storage.from("images").getPublicUrl(photo.name);

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
