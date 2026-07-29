const fs = require('fs');

// 1. Update index.html version query string to force immediate browser cache refresh
let html = fs.readFileSync('index.html', 'utf8');
const newVersion = 'v=' + Date.now();
html = html.replace(/css\/style\.css\?v=[^"']+/g, 'css/style.css?' + newVersion);
fs.writeFileSync('index.html', html, 'utf8');

// 2. Reduce Section 8 TMJ Hero padding by 50px in css/style.css (70px -> 45px)
let css = fs.readFileSync('css/style.css', 'utf8');

css = css.replace(`padding: 70px 0 70px 10px !important;`, `padding: 45px 0 45px 10px !important;`);

fs.writeFileSync('css/style.css', css, 'utf8');

console.log('Successfully reduced Section 8 TMJ hero vertical height by 50px with version ' + newVersion);
