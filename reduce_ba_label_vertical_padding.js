const fs = require('fs');

// 1. Update index.html version query string to force immediate browser cache refresh
let html = fs.readFileSync('index.html', 'utf8');
const newVersion = 'v=' + Date.now();
html = html.replace(/css\/style\.css\?v=[^"']+/g, 'css/style.css?' + newVersion);
fs.writeFileSync('index.html', html, 'utf8');

// 2. Reduce .ba-label vertical padding in css/style.css (15px -> 8px)
let css = fs.readFileSync('css/style.css', 'utf8');

css = css.replace(`.ba-label { padding: 15px 0; text-align: center; font-size: 18px; font-weight: 500; }`, `.ba-label { padding: 8px 0; text-align: center; font-size: 18px; font-weight: 500; }`);

fs.writeFileSync('css/style.css', css, 'utf8');

console.log('Successfully reduced BEFORE/AFTER color box vertical padding (15px -> 8px) with version ' + newVersion);
