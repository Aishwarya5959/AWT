const os = require("os");

console.log("OS Platform:", os.platform());
console.log("OS Architecture:", os.arch());
console.log("Free Memory:", os.freemem()); 
console.log("Total Memory:", os.totalmem()); 
console.log("Home Directory:", os.homedir()); 
console.log("Uptime (Seconds):", os.uptime()); 
