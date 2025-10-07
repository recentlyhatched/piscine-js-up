#!/usr/bin/env node

import http from "http";
import { writeFile, mkdir } from "fs/promises";
import { resolve } from "path";

const PORT = 5000;
const AUTHORIZED_FRIENDS = ["Caleb_Squires", "Tyrique_Dalton", "Rahima_Young"];
const SECRET_PASSWORD = "abracadabra";

function parseBasicAuth(authHeader) {
  if (!authHeader?.startsWith("Basic ")) return null;
  try {
    const base64 = authHeader.split(" ")[1];
    const decoded = Buffer.from(base64, "base64").toString("utf8");
    const [username, password] = decoded.split(":");
    return { username, password };
  } catch {
    return null;
  }
}

const server = http.createServer((req, res) => {
  // Only handle POST requests
  if (req.method !== "POST") {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "server failed" }));
    return;
  }

  // --- Authentication ---
  const authHeader = req.headers["authorization"];
  const credentials = parseBasicAuth(authHeader);

  const isAuthorized =
    credentials &&
    AUTHORIZED_FRIENDS.includes(credentials.username) &&
    credentials.password === SECRET_PASSWORD;

  if (!isAuthorized) {
    res.writeHead(401, { "Content-Type": "application/json" });
    res.end("Authorization Required");
    return;
  }

  // --- Authorized POST handling ---
  const guestName = decodeURIComponent(req.url.slice(1));
  if (!guestName) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "server failed" }));
    return;
  }

  let body = "";
  req.on("data", chunk => {
    body += chunk;
  });

  req.on("end", async () => {
    try {
      const guestsDir = resolve("guests");
      await mkdir(guestsDir, { recursive: true });

      const filePath = resolve(guestsDir, `${guestName}.json`);

      // Try to parse JSON body
      let parsed;
      try {
        parsed = JSON.parse(body);
      } catch {
        parsed = { data: body }; // fallback if invalid JSON
      }

      await writeFile(filePath, JSON.stringify(parsed, null, 2), "utf8");

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(parsed));
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
