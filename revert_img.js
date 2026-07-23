const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/<div class="diag-img" style="background: url\('image\/jain_section8_1_\d\.png'\) no-repeat center\/cover;"><\/div>/g, '<div class="diag-img"></div>');
fs.writeFileSync('index.html', html, 'utf8');
console.log('Reverted');