const fs = require('fs');

// 1. Update index.html version query string to force immediate browser cache refresh
let html = fs.readFileSync('index.html', 'utf8');
const newVersion = 'v=' + Date.now();
html = html.replace(/css\/style\.css\?v=[^"']+/g, 'css/style.css?' + newVersion);
fs.writeFileSync('index.html', html, 'utf8');

// 2. Update margin-top: 12px (-10px) and gap: 2px in css/style.css
let css = fs.readFileSync('css/style.css', 'utf8');

css = css.replace(`gap: 6px !important; /* Slightly tightened vertical spacing */`, `gap: 2px !important; /* Ultra-compact vertical spacing */`);
css = css.replace(`margin-top: 22px !important;`, `margin-top: 12px !important; /* Shifted UP by 10px */`);

fs.writeFileSync('css/style.css', css, 'utf8');

console.log('Successfully shifted 4-icon list UP by 10px and tightened gap to 2px with version ' + newVersion);
