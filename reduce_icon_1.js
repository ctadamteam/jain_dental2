const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(/url\('image\/jain_section8_1_2\.png'\) no-repeat center\/80%, #0b1536;/g, "url('image/jain_section8_1_2.png') no-repeat center/75%, #0b1536;");

fs.writeFileSync('index.html', html, 'utf8');
console.log('Specific icon reduced to 75%');