const fs = require('fs');

// 1. Update index.html version query string to force immediate browser cache refresh
let html = fs.readFileSync('index.html', 'utf8');
const newVersion = 'v=' + Date.now();
html = html.replace(/css\/style\.css\?v=[^"']+/g, 'css/style.css?' + newVersion);
fs.writeFileSync('index.html', html, 'utf8');

// 2. Increase Section 8 side padding by 5px (5px -> 10px) in css/style.css
let css = fs.readFileSync('css/style.css', 'utf8');

css = css.replace(`padding-left: 5px !important;\n        padding-right: 5px !important;`, `padding-left: 10px !important;\n        padding-right: 10px !important;`);

fs.writeFileSync('css/style.css', css, 'utf8');

console.log('Successfully increased Section 8 side padding by +5px (5px -> 10px) on mobile with version ' + newVersion);
