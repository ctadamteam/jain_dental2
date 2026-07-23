const fs = require('fs');

let current = fs.readFileSync('index.tmp', 'utf8'); // Wait, I don't know if index.tmp is good. 
// Let's read index.html instead and extract the good parts.
let html = fs.readFileSync('index.html', 'utf8');

// I will just use index.html, it has all the contents.
