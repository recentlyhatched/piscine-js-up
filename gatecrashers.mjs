#!/usr/bin/env node

import http from "http";
import { writeFile, mkdir } from "fs/promises";
import { resolve } from "path";

const PORT = 5000;
const FRIENDS = ["Caleb_Squires", "Tyrique_Dalton", "Rahima_Young"];
const PASSWORD = "abracadabra";

function parseAuth(header) {
  if (!header?.startsWith("Basic ")) return null;
  try {
    const base64 = header.split(" ")[1];
    const decoded = Buffer.from(base64, "base64").toString("utf8");
    const [username, password] = decoded.split(":");
    return { username, password };
  } catch {
    return null;
  }
}

const server = http.createServer(async (req, res) => {
  if (req.method !== "POST") {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "server failed" }));
    return;
  }

  const auth = parseAuth(req.headers["authorization"]);
  const authorized =
    auth &&
    FRIENDS.includes(auth.username) &&
    auth.password === PASSWORD;

  if (!authorized) {
    res.writeHead(401, { "Content-Type": "application/json" });
    res.end("Authorization Required");
    return;
  }

  const guestName = decodeURIComponent(req.url.slice(1));
  if (!guestName) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "server failed" }));
    return;
  }

  let body = "";
  req.on("data", chunk => (body += chunk));

  req.on("end", async () => {
    try {
      const data = JSON.parse(body || "{}");

      const guestsDir = resolve("guests");
      await mkdir(guestsDir, { recursive: true });

      const filePath = resolve(guestsDir, `${guestName}.json`);
      await writeFile(filePath, JSON.stringify(data, null, 2), "utf8");

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(data));
    } catch {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "server failed" }));
    }
  });

  req.on("error", () => {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "server failed" }));
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
