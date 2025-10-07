import http from 'http';
import fs from 'fs/promises';
import path from 'path';

// --- Configuration ---
const PORT = 5000;
const GUESTS_DIR = 'guests';
const AUTH_USERS = {
    'Caleb_Squires': 'abracadabra',
    'Tyrique_Dalton': 'abracadabra',
    'Rahima_Young': 'abracadabra'
};

/**
 * Parses the Authorization header for Basic Access Authentication.
 * @param {string} authHeader - The value of the Authorization header.
 * @returns {{user: string, pass: string} | null} - Object with user/pass or null if invalid.
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
 * Authenticates a user based on the parsed credentials.
 * @param {string} user - The username.
 * @param {string} pass - The password.
 * @returns {boolean} - True if authenticated, false otherwise.
 */
function isAuthenticated(user, pass) {
    return AUTH_USERS[user] === pass;
}

/**
 * Handles POST requests for authorized users.
 * @param {http.IncomingMessage} req - The request object.
 * @param {http.ServerResponse} res - The response object.
 */
async function handlePost(req, res) {
    const filename = path.basename(req.url);
    const filepath = path.join(GUESTS_DIR, `${filename}.json`);

    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        try {
            // Parse the incoming JSON
            const jsonData = JSON.parse(body);

            // Ensure the guests directory exists
            await fs.mkdir(GUESTS_DIR, { recursive: true });

            // Write the JSON to file
            await fs.writeFile(filepath, JSON.stringify(jsonData, null, 2), 'utf8');

            // Respond with the same JSON
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(jsonData));

        } catch (error) {
            console.error('Error handling POST request:', error);
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Invalid JSON' }));
        }
    });
}

// --- Server Creation ---
const server = http.createServer(async (req, res) => {
    if (req.method === 'POST') {
        // Authenticate
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

        // Handle authorized POST
        await handlePost(req, res);

    } else {
        // Only POST allowed
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not Found' }));
    }
});

// --- Server Start ---
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
