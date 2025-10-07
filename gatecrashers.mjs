#!/usr/bin/env node

import http from 'http';
import { writeFile, mkdir } from 'fs/promises';
import { resolve } from 'path';

const PORT = 5000;

// Allowed users and their shared password
const ALLOWED_USERS = ['Caleb_Squires', 'Tyrique_Dalton', 'Rahima_Young'];
const SECRET_PASSWORD = 'abracadabra';

/**
 * Parses the 'Authorization' header for Basic Auth credentials.
 * @param {http.IncomingMessage} req - The request object.
 * @returns {{username: string, password: string} | null} - Credentials or null if not found/invalid.
 */
function getBasicAuthCredentials(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return null;
  }

  const b64Auth = authHeader.slice(6).trim();
  const credentialsString = Buffer.from(b64Auth, 'base64').toString();
  const parts = credentialsString.split(':');
  if (parts.length !== 2) {
    return null;
  }

  const [username, password] = parts;
  return { username, password };
}

/**
 * Middleware-like function to handle 401 Unauthorized response.
 * @param {http.ServerResponse} res - The response object.
 */
function respondUnauthorized(res) {
  res.writeHead(401, {
    'Content-Type': 'application/json',
    'WWW-Authenticate': 'Basic realm="Guest List Modification"',
  });
  res.end('Authorization Required');
}

const server = http.createServer((req, res) => {
  // 1. Authentication
  const credentials = getBasicAuthCredentials(req);
  const isAuthorized =
    credentials &&
    ALLOWED_USERS.includes(credentials.username) &&
    credentials.password === SECRET_PASSWORD;

  if (!isAuthorized) {
    respondUnauthorized(res);
    return;
  }

  // 2. Only POST allowed
  if (req.method !== 'POST') {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'server failed' }));
    return;
  }

  const guestName = decodeURIComponent(req.url.slice(1));
  if (!guestName) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'server failed' }));
    return;
  }

  let body = '';
  req.on('data', chunk => {
    body += chunk;
  });

  req.on('end', async () => {
    try {
      const guestsDir = resolve('guests');
      await mkdir(guestsDir, { recursive: true });
      const filePath = resolve(guestsDir, `${guestName}.json`);

      let parsed;
      // Handle empty or non-JSON input gracefully
      if (!body || body.trim() === '') {
        parsed = {};
      } else {
        try {
          parsed = JSON.parse(body);
        } catch {
          // try to recover gracefully if the input is not valid JSON
          parsed = { data: body };
        }
      }

      // Save pretty JSON to file
      await writeFile(filePath, JSON.stringify(parsed, null, 2), 'utf8');

      // Respond with JSON
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(parsed));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'server failed' }));
    }
  });

  req.on('error', () => {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'server failed' }));
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
