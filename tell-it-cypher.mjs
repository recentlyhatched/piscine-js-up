#!/usr/bin/env node

import { readFile, writeFile } from 'fs/promises';
import { resolve } from 'path';

async function tellItCypher() {
    const inputPath = process.argv[2];
    const mode = process.argv[3];
    const outputName = process.argv[4];

    if (!inputPath || !mode) {
        console.error('Usage: node tell-it-cypher.mjs <file> <encode|decode> [outputFileName]');
        process.exit(1);
    }

    const inputFile = resolve(inputPath);
    let outputFile;

    // Determine output file name
    if (outputName) {
        outputFile = resolve(outputName);
    } else {
        outputFile = mode === 'encode' ? resolve('cypher.txt') : resolve('clear.txt');
    }

    try {
        const data = await readFile(inputFile);

        if (mode === 'encode') {
            // Convert to Base64
            const encoded = data.toString('base64');
            await writeFile(outputFile, encoded, 'utf8');
        } else if (mode === 'decode') {
            // Convert from Base64
            const decoded = Buffer.from(data.toString(), 'base64');
            await writeFile(outputFile, decoded);
        } else {
            console.error('Invalid mode. Use "encode" or "decode".');
            process.exit(1);
        }

    } catch (err) {
        console.error('Error:', err.message);
        process.exit(1);
    }
}

tellItCypher();
