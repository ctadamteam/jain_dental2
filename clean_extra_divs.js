const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(/<\/ul>\s*<\/div>\s*<\/div>\s*<\/div> <!-- container 닫기 -->/, '</ul>\n                    </div> <!-- container 닫기 -->');

const newVersion = 'v=' + Date.now();
html = html.replace(/css\/style\.css\?v=[^"']+/g, 'css/style.css?' + newVersion);
fs.writeFileSync('index.html', html, 'utf8');

console.log('Cleaned extra closing divs in index.html!');
