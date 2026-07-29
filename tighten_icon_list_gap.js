const fs = require('fs');

// 1. Update index.html version query string to force immediate browser cache refresh
let html = fs.readFileSync('index.html', 'utf8');
const newVersion = 'v=' + Date.now();
html = html.replace(/css\/style\.css\?v=[^"']+/g, 'css/style.css?' + newVersion);
fs.writeFileSync('index.html', html, 'utf8');

// 2. Update gap to 6px in css/style.css
let css = fs.readFileSync('css/style.css', 'utf8');

css = css.replace(`gap: 12px !important; /* Clean vertical spacing with NO dividers */`, `gap: 6px !important; /* Slightly tightened vertical spacing */`);

fs.writeFileSync('css/style.css', css, 'utf8');

console.log('Successfully tightened TMJ hero icon list vertical gap to 6px with version ' + newVersion);
