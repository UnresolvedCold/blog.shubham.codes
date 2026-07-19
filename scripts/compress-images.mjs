import { readdir, rename, stat, unlink } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const outputDir = path.resolve("dist");
const supportedExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

const formatters = {
  ".jpg": (image) =>
    image.jpeg({ quality: 78, mozjpeg: true, progressive: true }),
  ".jpeg": (image) =>
    image.jpeg({ quality: 78, mozjpeg: true, progressive: true }),
  ".png": (image) =>
    image.png({
      compressionLevel: 9,
      adaptiveFiltering: true,
      palette: true,
      quality: 82,
    }),
  ".webp": (image) => image.webp({ quality: 78, effort: 6 }),
  ".avif": (image) => image.avif({ quality: 52, effort: 6 }),
};

const formatBytes = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  const kib = bytes / 1024;
  if (kib < 1024) return `${kib.toFixed(1)} KiB`;
  return `${(kib / 1024).toFixed(2)} MiB`;
};

async function listImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const absolutePath = path.join(dir, entry.name);

      if (entry.isDirectory()) return listImages(absolutePath);
      if (!entry.isFile()) return [];

      const extension = path.extname(entry.name).toLowerCase();
      return supportedExtensions.has(extension) ? [absolutePath] : [];
    }),
  );

  return files.flat();
}

async function compressImage(file) {
  const extension = path.extname(file).toLowerCase();
  const formatter = formatters[extension];
  const original = await stat(file);
  const temporaryFile = `${file}.${process.pid}.tmp`;

  try {
    await formatter(sharp(file, { animated: true })).toFile(temporaryFile);

    const compressed = await stat(temporaryFile);
    if (compressed.size >= original.size) {
      await unlink(temporaryFile);
      return {
        status: "skipped",
        before: original.size,
        after: original.size,
      };
    }

    await rename(temporaryFile, file);
    return {
      status: "compressed",
      before: original.size,
      after: compressed.size,
    };
  } catch (error) {
    try {
      await unlink(temporaryFile);
    } catch {
      // The temp file may not exist if Sharp failed before writing it.
    }

    return {
      status: "failed",
      before: original.size,
      after: original.size,
      error,
    };
  }
}

const images = await listImages(outputDir);
const results = await Promise.all(images.map(compressImage));

const totals = results.reduce(
  (accumulator, result) => {
    accumulator.before += result.before;
    accumulator.after += result.after;
    accumulator[result.status] += 1;
    return accumulator;
  },
  { before: 0, after: 0, compressed: 0, skipped: 0, failed: 0 },
);

const saved = totals.before - totals.after;
console.log(
  `Compressed ${totals.compressed}/${images.length} images in dist. ` +
    `Saved ${formatBytes(saved)} (${formatBytes(totals.before)} -> ${formatBytes(
      totals.after,
    )}).`,
);

if (totals.failed > 0) {
  console.warn(`Failed to compress ${totals.failed} image(s).`);
}
