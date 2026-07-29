const fs = require('fs');

// 1. Update index.html version query string to force immediate browser cache refresh
let html = fs.readFileSync('index.html', 'utf8');
const newVersion = 'v=' + Date.now();
html = html.replace(/css\/style\.css\?v=[^"']+/g, 'css/style.css?' + newVersion);
fs.writeFileSync('index.html', html, 'utf8');

// 2. Update css/style.css with shifted down description & 4 icons, and 42px (+10%) matchum icon
let css = fs.readFileSync('css/style.css', 'utf8');

css = css.replace(`margin-bottom: 18px !important;`, `margin-top: 14px !important;\n        margin-bottom: 24px !important;`);
css = css.replace(`margin-top: 16px !important;`, `margin-top: 22px !important;`);
css = css.replace(`width: 38px !important; /* +20% enlarged */\n        height: 38px !important;`, `width: 42px !important; /* +10% further enlarged (42px) */\n        height: 42px !important;`);

fs.writeFileSync('css/style.css', css, 'utf8');

console.log('Successfully shifted description text & icons down and scaled matchum icon to 42px (+10%) with version ' + newVersion);
