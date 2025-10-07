// tell-me-vip.mjs

import { readFile, writeFile } from 'fs/promises';

/**
 * Filters a guest list, finds those who confirmed 'YES', sorts them
 * alphabetically, formats the output, and saves the VIP list to a file.
 */
async function createVipList() {
    // 1. Define file names
    const inputFileName = 'guests.txt';
    const outputFileName = 'vip.txt';

    try {
        // 2. Read the guest list file
        // The file is assumed to contain data formatted as: Lastname Firstname Status
        // e.g., Smith John YES
        const data = await readFile(inputFileName, { encoding: 'utf8' });

        // 3. Process the data
        const lines = data.split('\n').filter(line => line.trim() !== ''); // Split into lines and remove empty ones

        // Filter for 'YES' confirmations
        const vipGuests = lines.filter(line => {
            // Check if the line ends with 'YES' (case-insensitive for robustness)
            return line.trim().toUpperCase().endsWith(' YES');
        });

        // Extract and format names as 'Lastname Firstname'
        const names = vipGuests.map(line => {
            // Split the line, which should be 'Lastname Firstname Status'
            const parts = line.trim().split(/\s+/);
            // The status is the last part, we just want the name parts before it
            // Assuming the first two words are Lastname and Firstname
            if (parts.length >= 3) {
                return `${parts[0]} ${parts[1]}`;
            }
            // Fallback for unexpected formats, though we assume the standard format
            return line.trim().replace(/\s+YES$/i, '');
        });

        // 4. Sort the names alphabetically
        names.sort();

        // 5. Format the final output
        const formattedVipList = names.map((name, index) => {
            // Format: Number. Lastname Firstname (starting from 1)
            return `${index + 1}. ${name}`;
        }).join('\n'); // Join with newlines

        // 6. Print the list to the console (as requested)
        console.log('--- VIP Guest List ---');
        console.log(formattedVipList);
        console.log('------------------------');

        // 7. Save the list to the output file
        await writeFile(outputFileName, formattedVipList, { encoding: 'utf8' });
        console.log(`\nSuccessfully saved the VIP list to ${outputFileName}.`);

    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error(`Error: Input file '${inputFileName}' not found.`);
            console.error('Please create a file named \'guests.txt\' with your guest data.');
        } else {
            console.error('An error occurred:', error.message);
        }
    }
}

createVipList();