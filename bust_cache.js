const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/css\/style\.css\?v=\d+/, 'css/style.css?v=' + Date.now());
fs.writeFileSync('index.html', html, 'utf8');
console.log('Cache busted.');
