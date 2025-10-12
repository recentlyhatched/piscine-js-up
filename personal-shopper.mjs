import fs from 'fs/promises'
import { json } from 'stream/consumers'

if (!process.argv[2]) {
    console.log("Example usages")
    console.log("To create a file: node personal-shopper.mjs <shopping-list.json> create")
    console.log("To delete a file: node personal-shopper.mjs <shopping-list.json> delete")
    console.log("To add an element to a list: node personal-shopper.mjs <shopping-list.json> add <element> [2]")
    console.log("To remove an alement from a list: node personal-shopper.mjs <shopping-list.json> rm <element> [5]")
    console.log("To list all command lines avaliable: node personal-shopper.mjs <shopping-list.json> help")
    console.log("To print the list in the file: node personal-shopper.mjs <shopping-list.json> ls")
} 

async function writeNewFile(jsonFileName) {
    try {
        await fs.writeFile(jsonFileName, JSON.stringify({}), 'utf8')
        console.log(`${jsonFileName} successfully created`)
    } catch (err) {
        console.error("Error writing files:", err)
    }
}

async function deleteExsistingFile(jsonFileName) {
    try {
        // check if file exists before deleting
        await fs.access(jsonFileName)

        // delete file
        await fs.unlink(jsonFileName)
        console.log(`${jsonFileName} successfully deleted`)
    } catch (err) {
        if (err.code === 'ENOENT') {
            console
        }
    }
}

// async function addElements(jsonFileName, nameOfElement, numberOfElements = 1) {
    
//     if (isNaN(numberOfElements)) {
//         numberOfElements = 1
//     }

//     let data

//     try {
//         const fileContent = await fs.readFile(jsonFileName, 'utf8')
//         data = JSON.parse(fileContent)
//     } catch (err) {
//         console.log("Error reading file in addElements():", err)
//     }


//     try {
//          // add new element
//         if (!(nameOfElement in data)) {
//             data[nameOfElement] = numberOfElements
//         } else {
//             data[nameOfElement] += numberOfElements
//         }
        
//         await fs.writeFile(jsonFileName, JSON.stringify(data), 'utf8')
//         console.log(`${jsonFileName} successfully updated`)

//     } catch (err) {
//         console.log("Error adding elements:", err)
//     }



// }

if (process.argv[3] === "create") {
    writeNewFile(process.argv[2])
}

if (process.argv[3] === "delete") {
    deleteExsistingFile(process.argv[2])
}

if (process.argv[3] === "add") {
    if (!process.argv[4]) {
        console.log("No elem specified")
    } else {
        addElements(process.argv[2], process.argv[4], process.argv[5])
    }
}