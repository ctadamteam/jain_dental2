const fs = require('fs');

// 1. Update index.html version query string to force immediate browser cache refresh
let html = fs.readFileSync('index.html', 'utf8');
const newVersion = 'v=' + Date.now();
html = html.replace(/css\/style\.css\?v=[^"']+/g, 'css/style.css?' + newVersion);
fs.writeFileSync('index.html', html, 'utf8');

// 2. Reduce max-width to 178px (-20px) and trim padding to 8px 8px in css/style.css
let css = fs.readFileSync('css/style.css', 'utf8');

css = css.replace(`max-width: 198px !important; /* -32px width reduction */ /* Slim 1-column box width, leaving plenty of room before woman image */`, `max-width: 178px !important; /* -20px further width reduction */`);
css = css.replace(`padding: 14px 16px !important;`, `padding: 8px 8px !important; /* Trimmed inside padding */`);

fs.writeFileSync('css/style.css', css, 'utf8');

console.log('Successfully reduced TMJ hero glass card width to 178px (-20px) and trimmed inside padding with version ' + newVersion);
