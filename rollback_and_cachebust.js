const { execSync } = require('child_process');
const fs = require('fs');

console.log('Rolling back to commit efc0925...');

// 1. Reset working directory hard to commit efc0925
execSync('git reset --hard efc0925', { stdio: 'inherit' });

// 2. Update index.html version query string to force immediate browser cache refresh
let html = fs.readFileSync('index.html', 'utf8');
const newVersion = 'v=' + Date.now();
html = html.replace(/css\/style\.css\?v=[^"']+/g, 'css/style.css?' + newVersion);
fs.writeFileSync('index.html', html, 'utf8');

console.log('Cache-busting timestamp updated to ' + newVersion);
