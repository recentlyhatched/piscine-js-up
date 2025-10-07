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
    if (!authHeader || !authHeader.startsWith('Basic ')) {
        return null;
    }
    try {
        const encoded = authHeader.substring(6).trim();
        const decoded = Buffer.from(encoded, 'base64').toString('utf8');
        const [user, pass] = decoded.split(':');
        return { user, pass };
    } catch (e) {
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
 * @returns {Promise<void>}
 */
async function handlePost(req, res) {
    const filename = path.basename(req.url); // Use the path segment as the filename
    const filepath = path.join(GUESTS_DIR, `${filename}.json`);

    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        try {
            // Ensure the guests directory exists
            await fs.mkdir(GUESTS_DIR, { recursive: true });

            // Store the body content in the file
            await fs.writeFile(filepath, body, 'utf8');

            // Set response headers
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(200);

            // Respond with the content that was just stored
            res.end(body);

        } catch (error) {
            console.error('Error handling POST request:', error);
            // Handle file or JSON errors gracefully
            res.setHeader('Content-Type', 'text/plain');
            res.writeHead(500);
            res.end('Internal Server Error');
        }
    });
}

// --- Server Creation ---
const server = http.createServer(async (req, res) => {
    // 1. Authentication Check for POST requests
    if (req.method === 'POST') {
        const authHeader = req.headers['authorization'];
        const credentials = parseBasicAuth(authHeader);

        if (!credentials || !isAuthenticated(credentials.user, credentials.pass)) {
            // Unauthorized response
            res.setHeader('WWW-Authenticate', 'Basic realm="Guest List Access"');
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(401);
            res.end('Authorization Required\n'); // As per the example output
            return;
        }

        // 2. Handle Authorized POST request
        await handlePost(req, res);

    } else {
        // Handle methods other than POST (e.g., GET) - they are not explicitly required to be handled
        // but we'll send a 404 for completeness in a simplified manner.
        res.writeHead(404);
        res.end('Not Found');
    }
});

// --- Server Start ---
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    // Example output: Server listening on port 5000
});

// Clean up: Add error handling for server
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use.`);
    } else {
        console.error('Server error:', err);
    }
    process.exit(1);
});