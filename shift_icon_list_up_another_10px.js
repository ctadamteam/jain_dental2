const fs = require('fs');

// 1. Update index.html version query string to force immediate browser cache refresh
let html = fs.readFileSync('index.html', 'utf8');
const newVersion = 'v=' + Date.now();
html = html.replace(/css\/style\.css\?v=[^"']+/g, 'css/style.css?' + newVersion);
fs.writeFileSync('index.html', html, 'utf8');

// 2. Update margin-top: 2px (-10px) for .tmj-hero-list in css/style.css
let css = fs.readFileSync('css/style.css', 'utf8');

css = css.replace(`margin-top: 12px !important; /* Shifted UP by 10px */`, `margin-top: 2px !important; /* Shifted UP by another 10px */`);

fs.writeFileSync('css/style.css', css, 'utf8');

console.log('Successfully shifted 4-icon list UP by another 10px to margin-top: 2px with version ' + newVersion);
