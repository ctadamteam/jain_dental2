const fs = require('fs');

// 1. Update index.html version query string to force immediate browser cache refresh
let html = fs.readFileSync('index.html', 'utf8');
const newVersion = 'v=' + Date.now();
html = html.replace(/css\/style\.css\?v=[^"']+/g, 'css/style.css?' + newVersion);
fs.writeFileSync('index.html', html, 'utf8');

// 2. Double icon size (18px -> 36px) in css/style.css
let css = fs.readFileSync('css/style.css', 'utf8');

css = css.replace(`max-width: 175px !important;`, `max-width: 215px !important;`);
css = css.replace(`width: 22px !important;\n        height: 22px !important;\n        min-width: 22px !important;`, `width: 40px !important;\n        height: 40px !important;\n        min-width: 40px !important;`);
css = css.replace(`margin-right: 8px !important;`, `margin-right: 12px !important;`);
css = css.replace(`width: 18px !important; /* Scaled up inner image icon */\n        height: 18px !important;`, `width: 36px !important; /* 2x doubled inner image icon */\n        height: 36px !important;`);

fs.writeFileSync('css/style.css', css, 'utf8');

console.log('Successfully doubled TMJ hero icon size to 36px (2x) with version ' + newVersion);
