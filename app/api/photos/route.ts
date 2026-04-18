import { readdir } from "fs/promises";
import { join } from "path";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const dir = join(process.cwd(), "public", "photos");
  const files = await readdir(dir);
  const photos = files
    .filter((f) => /\.(jpe?g|png|webp|JPG|PNG|JPEG|WEBP)$/i.test(f))
    .map((f) => `/photos/${encodeURIComponent(f)}`);
  return NextResponse.json(photos);
}
