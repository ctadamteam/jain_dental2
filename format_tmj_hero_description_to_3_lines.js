const fs = require('fs');

// 1. Update index.html version query string to force immediate browser cache refresh
let html = fs.readFileSync('index.html', 'utf8');
const newVersion = 'v=' + Date.now();
html = html.replace(/css\/style\.css\?v=[^"']+/g, 'css/style.css?' + newVersion);
fs.writeFileSync('index.html', html, 'utf8');

// 2. Set max-width: 220px on .tmj-hero-content p to format description into 3 clean lines
let css = fs.readFileSync('css/style.css', 'utf8');

css = css.replace(`margin-bottom: 16px !important;\n    }`, `margin-bottom: 16px !important;\n        max-width: 220px !important;\n    }`);

fs.writeFileSync('css/style.css', css, 'utf8');

console.log('Successfully formatted TMJ hero description to 3 clean lines (max-width: 220px) with version ' + newVersion);
