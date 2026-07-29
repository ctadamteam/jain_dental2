const fs = require('fs');

// 1. Update index.html version query string to force immediate browser cache refresh
let html = fs.readFileSync('index.html', 'utf8');
const newVersion = 'v=' + Date.now();
html = html.replace(/css\/style\.css\?v=[^"']+/g, 'css/style.css?' + newVersion);
fs.writeFileSync('index.html', html, 'utf8');

// 2. Shift .tmj-hero-content another 30px to the left (-20px -> -50px) and trim side padding in css/style.css
let css = fs.readFileSync('css/style.css', 'utf8');

css = css.replace(`margin-left: -20px !important;`, `margin-left: -50px !important;`);
css = css.replace(`padding: 35px 10px !important;`, `padding: 35px 0 35px 5px !important;`);

fs.writeFileSync('css/style.css', css, 'utf8');

console.log('Successfully shifted TMJ hero content another 30px to the left with reduced padding with version ' + newVersion);
