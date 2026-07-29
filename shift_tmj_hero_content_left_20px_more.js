const fs = require('fs');

// 1. Update index.html version query string to force immediate browser cache refresh
let html = fs.readFileSync('index.html', 'utf8');
const newVersion = 'v=' + Date.now();
html = html.replace(/css\/style\.css\?v=[^"']+/g, 'css/style.css?' + newVersion);
fs.writeFileSync('index.html', html, 'utf8');

// 2. Shift .tmj-hero-content another 20px further to the left in css/style.css (-20px -> -40px)
let css = fs.readFileSync('css/style.css', 'utf8');

css = css.replace(`margin-left: -20px !important;`, `margin-left: -40px !important;`);

fs.writeFileSync('css/style.css', css, 'utf8');

console.log('Successfully shifted TMJ hero content another 20px to the left with version ' + newVersion);
