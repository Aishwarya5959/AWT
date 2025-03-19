const util = require("util");
const fs = require("fs");
 
const readFileAsync = util.promisify(fs.readFile);

async function readFile() {
    try {
        let data = await readFileAsync("xyz.txt", "utf-8");
        console.log("File Content:", data);
    } catch (error) {
        console.error("Error:", error);
    }
}

readFile();
