// tell-me-vip.mjs

import { readFile, writeFile, readdir } from 'fs/promises';
import { join } from 'path';

const outputFileName = 'vip.txt';

async function createVipList() {
    const inputDir = '.';
    const vipNames = [];

    try {
        // 1. Read all files in the current directory
        const files = await readdir(inputDir);
        const jsonFiles = files.filter(file => file.endsWith('.json'));

        for (const filename of jsonFiles) {
            const filePath = join(inputDir, filename);
            
            // 2. Read and parse the JSON content
            const fileContent = await readFile(filePath, { encoding: 'utf8' });
            const guestData = JSON.parse(fileContent);

            // 3. Check the RSVP status (case-insensitive 'yes')
            if (guestData.answer && guestData.answer.toLowerCase() === 'yes') {
                
                // 4. Extract Lastname and Firstname from the filename
                // Filename format: Firstname_Lastname.json
                const nameParts = filename
                    .replace(/\.json$/i, '') 
                    .split('_');              

                if (nameParts.length === 2) {
                    // Test expects format: "Lastname Firstname"
                    const [firstName, lastName] = nameParts;
                    vipNames.push(`${lastName} ${firstName}`);
                }
            }
        }

        // 5. Sort the names alphabetically
        vipNames.sort();

        // 6. Format the final output
        const formattedVipList = vipNames.map((name, index) => {
            // Format: Number. Lastname Firstname (starting from 1)
            return `${index + 1}. ${name}`;
        }).join('\n');

        // 7. Save the list to the output file
        await writeFile(outputFileName, formattedVipList, { encoding: 'utf8' });

        // 8. CRITICAL FIX: Print ONLY the formatted list to stdout.
        // If the list is empty, print an empty string to ensure no extra newlines.
        console.log(formattedVipList);

    } catch (error) {
        // Handle critical errors by ensuring an empty file is written and nothing extra is printed.
        await writeFile(outputFileName, '', { encoding: 'utf8' });
        console.log(''); // Print an empty line if something went wrong but keep silent
    }
}

createVipList();