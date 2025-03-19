const fs = require("fs");
 
fs.writeFile("example.txt", "Hello, this is a file!", (err) => {
    if (err) throw err;
    console.log("File created and written!");
 
    fs.readFile("example.txt", "utf-8", (err, data) => {
        if (err) throw err;
        console.log("File Content:", data);

      
        fs.appendFile("example.txt", "\nAppended text!", (err) => {
            if (err) throw err;
            console.log("Text appended!");
 
            fs.readFile("example.txt", "utf-8", (err, updatedData) => {
                if (err) throw err;
                console.log("Updated Content:", updatedData);

 
                fs.unlink("example.txt", (err) => {
                    if (err) throw err;
                    console.log("File deleted!");
                });
            });
        });
    });
});
