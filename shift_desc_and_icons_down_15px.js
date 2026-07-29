const fs = require('fs');

// 1. Update index.html version query string to force immediate browser cache refresh
let html = fs.readFileSync('index.html', 'utf8');
const newVersion = 'v=' + Date.now();
html = html.replace(/css\/style\.css\?v=[^"']+/g, 'css/style.css?' + newVersion);
fs.writeFileSync('index.html', html, 'utf8');

// 2. Update margin-top: 25px (+15px) for #tmj .tmj-hero-content p in css/style.css
let css = fs.readFileSync('css/style.css', 'utf8');

css = css.replace(`margin-top: 10px !important;`, `margin-top: 25px !important; /* Shifted DOWN by 15px */`);

fs.writeFileSync('css/style.css', css, 'utf8');

console.log('Successfully shifted description text & icons DOWN by 15px with version ' + newVersion);
