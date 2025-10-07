// tell-me-vip.mjs
import { readFile, writeFile, readdir } from 'fs/promises';
import { join } from 'path';

const outputFileName = 'vip.txt';

async function createVipList() {
    // 1. Accept input directory from CLI arguments or default to '.'
    const inputDir = process.argv[2] || '.';
    const vipNames = [];

    try {
        // 2. Read all files in the input directory
        const files = await readdir(inputDir);
        const jsonFiles = files.filter(file => file.endsWith('.json'));

        for (const filename of jsonFiles) {
            const filePath = join(inputDir, filename);
            
            // 3. Read and parse the JSON content
            const fileContent = await readFile(filePath, { encoding: 'utf8' });
            const guestData = JSON.parse(fileContent);

            // 4. Check the RSVP status (case-insensitive 'yes')
            if (guestData.answer && guestData.answer.toLowerCase() === 'yes') {
                
                // 5. Extract Lastname and Firstname from the filename
                const nameParts = filename.replace(/\.json$/i, '').split('_');

                if (nameParts.length === 2) {
                    const [firstName, lastName] = nameParts;
                    vipNames.push(`${lastName} ${firstName}`);
                }
            }
        }

        // 6. Sort the names alphabetically
        vipNames.sort();

        // 7. Format the final output
        const formattedVipList = vipNames.map((name, index) => `${index + 1}. ${name}`).join('\n');

        // 8. Save the list to the output file
        await writeFile(outputFileName, formattedVipList, { encoding: 'utf8' });

        // 9. Print ONLY the formatted list
        console.log(formattedVipList);

    } catch (error) {
        // On error, write an empty file and print an empty string
        await writeFile(outputFileName, '', { encoding: 'utf8' });
        console.log('');
    }
}

createVipList();
