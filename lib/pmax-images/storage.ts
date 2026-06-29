import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { PUBLIC_PREFIX, STORAGE_DIR } from "./config";

// Speichert ein generiertes Bild unter public/generated/{orderId}/{filename}
// und liefert absoluten Disk-Pfad + öffentliche URL zurück.

export async function saveImage(
  orderId: string,
  filename: string,
  buffer: Buffer
): Promise<{ path: string; publicUrl: string }> {
  const dir = join(process.cwd(), STORAGE_DIR, orderId);
  await mkdir(dir, { recursive: true });
  const filePath = join(dir, filename);
  await writeFile(filePath, buffer);
  return {
    path: filePath,
    publicUrl: `${PUBLIC_PREFIX}/${orderId}/${filename}`,
  };
}

export function filenameFor(motifIndex: number, format: string): string {
  return `m${motifIndex + 1}-${format}.jpg`;
}

export function logoFilenameFor(variant: "square" | "landscape"): string {
  return `logo-${variant}.png`;
}
