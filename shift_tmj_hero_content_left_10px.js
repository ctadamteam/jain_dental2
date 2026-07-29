const fs = require('fs');

// 1. Update index.html version query string to force immediate browser cache refresh
let html = fs.readFileSync('index.html', 'utf8');
const newVersion = 'v=' + Date.now();
html = html.replace(/css\/style\.css\?v=[^"']+/g, 'css/style.css?' + newVersion);
fs.writeFileSync('index.html', html, 'utf8');

// 2. Shift Section 8 TMJ hero content 10px to the left (translateX -50px -> -60px) in css/style.css
let css = fs.readFileSync('css/style.css', 'utf8');

css = css.replace(`transform: translateX(-50px) !important;`, `transform: translateX(-60px) !important;`);

fs.writeFileSync('css/style.css', css, 'utf8');

console.log('Successfully shifted TMJ hero content 10px to the left (translateX -60px) with version ' + newVersion);
