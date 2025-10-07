// tell-me-vip.mjs (Modified)

import { readFile, writeFile } from 'fs/promises';

const inputFileName = 'guests.txt';
const outputFileName = 'vip.txt';

async function createVipList() {
    let data;
    try {
        // --- MODIFICATION HERE: Catch the ENOENT error specifically ---
        data = await readFile(inputFileName, { encoding: 'utf8' });
    } catch (error) {
        if (error.code === 'ENOENT') {
            // If the input file is missing, treat the guest list as empty.
            data = ''; 
        } else {
            // For other errors (permissions, etc.), rethrow the error.
            throw error;
        }
    }

    // Process the data (which is now '' if the file was missing)
    const lines = data.split('\n').filter(line => line.trim() !== '');

    // The rest of your logic remains the same:
    // 1. Filter lines that end with ' YES'
    const vipGuests = lines.filter(line => line.trim().toUpperCase().endsWith(' YES'));
    
    // 2. Extract and format names
    const names = vipGuests.map(line => {
        const parts = line.trim().split(/\s+/);
        return parts.slice(0, -1).join(' '); // Get all parts except the last one (the status)
    });

    // 3. Sort the names
    names.sort();

    // 4. Format the final output
    const formattedVipList = names.map((name, index) => {
        return `${index + 1}. ${name}`;
    }).join('\n');

    // 5. Save the list (This is now safe even if the list is empty)
    await writeFile(outputFileName, formattedVipList, { encoding: 'utf8' });

    // Optional: Print to console
    if (formattedVipList) {
        console.log('--- VIP Guest List ---');
        console.log(formattedVipList);
        console.log('------------------------');
    } else {
        console.log('No VIP guests found.');
    }
}

createVipList();