// Local preview of the exported files using the same /daroonik path as cPanel.
// This is a development convenience, not a production web server.
import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(process.cwd(), "out");
const port = Number(process.env.PORT || 3000);
const mime = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8", ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8", ".svg": "image/svg+xml",
  ".webp": "image/webp", ".png": "image/png", ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg", ".ttf": "font/ttf", ".woff2": "font/woff2",
  ".ico": "image/x-icon",
};

createServer(async (req, res) => {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405).end(); return;
  }
  try {
    const url = new URL(req.url || "/", "http://preview.invalid");
    if (url.pathname === "/" || url.pathname === "/daroonik") {
      res.writeHead(302, { Location: `/daroonik/${url.search}` }).end(); return;
    }
    if (!url.pathname.startsWith("/daroonik/")) {
      res.writeHead(404).end("Not found"); return;
    }
    const relative = decodeURIComponent(url.pathname.slice("/daroonik/".length));
    let target = path.resolve(root, relative);
    if (target !== root && !target.startsWith(root + path.sep)) {
      res.writeHead(403).end("Forbidden"); return;
    }
    let info = await stat(target);
    if (info.isDirectory()) {
      if (!url.pathname.endsWith("/")) {
        res.writeHead(301, { Location: `${url.pathname}/${url.search}` }).end(); return;
      }
      target = path.join(target, "index.html");
      info = await stat(target);
    }
    res.writeHead(200, { "Content-Type": mime[path.extname(target).toLowerCase()] || "application/octet-stream", "Content-Length": info.size });
    if (req.method === "HEAD") res.end(); else createReadStream(target).pipe(res);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }).end("Not found. Run npm run build first.");
  }
}).listen(port, "0.0.0.0", () => console.log(`Portfolio preview: http://localhost:${port}/daroonik/`));
