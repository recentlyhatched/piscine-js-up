import http from 'http';
import fs from 'fs/promises';
import path from 'path';

// --- Configuration ---
const PORT = 5000;
const GUESTS_DIR = path.join(process.cwd(), 'guests'); // Absolute path
const AUTH_USERS = {
    'Caleb_Squires': 'abracadabra',
    'Tyrique_Dalton': 'abracadabra',
    'Rahima_Young': 'abracadabra'
};

/**
 * Parses Basic Auth header.
 */
function parseBasicAuth(authHeader) {
    if (!authHeader || !authHeader.startsWith('Basic ')) return null;
    try {
        const encoded = authHeader.substring(6).trim();
        const decoded = Buffer.from(encoded, 'base64').toString('utf8');
        const [user, pass] = decoded.split(':');
        return { user, pass };
    } catch {
        return null;
    }
}

/**
 * Validates credentials.
 */
function isAuthenticated(user, pass) {
    return AUTH_USERS[user] === pass;
}

/**
 * Handles POST requests from authorized users.
 */
async function handlePost(req, res) {
    const filename = path.basename(req.url);
    const filepath = path.join(GUESTS_DIR, `${filename}.json`);

    let body = '';
    req.on('data', chunk => body += chunk.toString());

    req.on('end', async () => {
        try {
            const jsonData = JSON.parse(body); // Parse incoming JSON

            // Ensure guests folder exists
            await fs.mkdir(GUESTS_DIR, { recursive: true });

            // Write JSON to file
            await fs.writeFile(filepath, JSON.stringify(jsonData, null, 2), 'utf8');

            // Respond with same JSON
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(jsonData));

        } catch (error) {
            console.error('Error handling POST request:', error);
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Invalid JSON' }));
        }
    });
}

// --- Create HTTP server ---
const server = http.createServer(async (req, res) => {
    if (req.method === 'POST') {
        const authHeader = req.headers['authorization'];
        const credentials = parseBasicAuth(authHeader);

        if (!credentials || !isAuthenticated(credentials.user, credentials.pass)) {
            res.writeHead(401, {
                'WWW-Authenticate': 'Basic realm="Guest List Access"',
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({ error: 'Authorization Required' }));
            return;
        }

        await handlePost(req, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not Found' }));
    }
});

// --- Start server ---
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use.`);
    } else {
        console.error('Server error:', err);
    }
    process.exit(1);
});
