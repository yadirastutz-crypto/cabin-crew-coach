import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const PORT = Number(process.env.PORT) || 3000;
const DIST = join(__dirname, "dist");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".otf": "font/otf",
};

async function resolveFile(pathname) {
  let filePath = join(DIST, pathname);

  try {
    const s = await stat(filePath);
    if (s.isDirectory()) {
      filePath = join(filePath, "index.html");
      await stat(filePath);
    }
    return filePath;
  } catch {
    return null;
  }
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", `http://localhost`);
  const filePath = await resolveFile(url.pathname);

  if (filePath) {
    try {
      const content = await readFile(filePath);
      const mime = MIME[extname(filePath).toLowerCase()] ?? "application/octet-stream";
      // Service workers and the web manifest must never be cached immutably —
      // browsers need fresh copies to detect installs and updates.
      // HTML files are also served without long-term cache.
      const isNoCache =
        url.pathname.endsWith("/service-worker.js") ||
        url.pathname.endsWith("/manifest.json") ||
        url.pathname.endsWith("/manifest.webmanifest");
      const ext = extname(filePath).toLowerCase();
      const cacheControl =
        isNoCache || ext === ".html"
          ? "no-cache, no-store, must-revalidate"
          : "public, max-age=31536000, immutable";
      res.writeHead(200, {
        "Content-Type": mime,
        "Cache-Control": cacheControl,
      });
      res.end(content);
      return;
    } catch {
      // fall through
    }
  }

  try {
    const index = await readFile(join(DIST, "index.html"));
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-cache",
    });
    res.end(index);
  } catch {
    res.writeHead(500);
    res.end("Internal server error");
  }
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`  ➜  Static server running on http://0.0.0.0:${PORT}`);
  console.log(`  ➜  Serving from ${DIST}`);
});
