import http from 'http';
import fs from 'fs/promises';
import path from 'path';

// --- Configuration ---
const PORT = 5000;
// FIX: Using a relative path 'guests' so the directory is created within the test environment's working directory.
const GUESTS_DIR = 'guests'; 
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
    // Get the filename (e.g., Ricky_Banni) from the URL path
    const filename = path.basename(req.url);
    const filepath = path.join(GUESTS_DIR, `${filename}.json`);

    let body = '';
    // Read the request body data chunks
    req.on('data', chunk => body += chunk.toString());

    req.on('end', async () => {
        let responseBody;
        try {
            // 1. Parse and validate JSON
            const jsonData = JSON.parse(body);
            responseBody = JSON.stringify(jsonData);

            // 2. Ensure guests folder exists
            await fs.mkdir(GUESTS_DIR, { recursive: true });

            // 3. Write the JSON to the file
            // Use pretty print for storage, but return unformatted JSON for the response
            await fs.writeFile(filepath, JSON.stringify(jsonData, null, 2), 'utf8');
            
            // 4. Send 200 OK response (Note: uninvited uses 201, but gatecrashers example uses 200)
            res.writeHead(200, { 
                'Content-Type': 'application/json',
                // Add Content-Length for robust transmission
                'Content-Length': Buffer.byteLength(responseBody, 'utf8') 
            });
            res.end(responseBody);

        } catch (error) {
            // Handle bad JSON (400) or file system errors (500)
            console.error('Error handling POST request:', error.message);
            
            // If the error is a SyntaxError (bad JSON), respond with 400.
            if (error instanceof SyntaxError) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid JSON body' }));
            } else {
                // If the error is a file system error, respond with 500 (as per uninvited instructions)
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'server failed' }));
            }
        }
    });
}

// --- Create HTTP server ---
const server = http.createServer(async (req, res) => {
    if (req.method === 'POST') {
        const authHeader = req.headers['authorization'];
        const credentials = parseBasicAuth(authHeader);

        if (!credentials || !isAuthenticated(credentials.user, credentials.pass)) {
            // Handle 401 Unauthorized
            res.writeHead(401, {
                'WWW-Authenticate': 'Basic realm="Guest List Access"',
                'Content-Type': 'application/json'
            });
            // Matching the curl example's body output ("Authorization Required%")
            res.end("Authorization Required\n"); 
            return;
        }

        // Handle Authorized POST request
        await handlePost(req, res);
    } else {
        // Handle non-POST methods
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