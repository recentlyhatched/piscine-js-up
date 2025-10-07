#!/usr/bin/env node

import { readFile, writeFile, readdir } from 'fs/promises';
import { join } from 'path';

const outputFileName = 'vip.txt';
const inputDir = process.argv[2] || '.';

async function createVipList() {
    const vipNames = [];

    try {
        const files = await readdir(inputDir);
        const jsonFiles = files.filter(file => file.toLowerCase().endsWith('.json'));

        for (const filename of jsonFiles) {
            const filePath = join(inputDir, filename);

            try {
                const content = await readFile(filePath, 'utf8');
                const data = JSON.parse(content);

                if (data.answer && data.answer.toLowerCase() === 'yes') {
                    const base = filename.replace(/\.json$/i, '');
                    const parts = base.split('_');

                    if (parts.length === 2) {
                        const [first, last] = parts;
                        vipNames.push(`${last} ${first}`);
                    }
                }
            } catch {
                // ignore individual file errors
            }
        }

        vipNames.sort();

        const formattedVipList = vipNames.map((name, index) => `${index + 1}. ${name}`).join('\n');

        await writeFile(join(inputDir, outputFileName), formattedVipList, 'utf8');

        console.log(formattedVipList); // Only print the final formatted list

    } catch {
        // On critical failure, write empty file and print nothing
        await writeFile(join(inputDir, outputFileName), '', 'utf8');
    }
}

createVipList();
