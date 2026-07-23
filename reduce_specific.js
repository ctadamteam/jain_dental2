const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The lines we want to change have 'jain_section8_1_2.png', '1_3.png', '1_5.png'
// Currently they have 'center/90%, #0b1536;'

html = html.replace(/url\('image\/jain_section8_1_2\.png'\) no-repeat center\/90%, #0b1536;/g, "url('image/jain_section8_1_2.png') no-repeat center/80%, #0b1536;");
html = html.replace(/url\('image\/jain_section8_1_3\.png'\) no-repeat center\/90%, #0b1536;/g, "url('image/jain_section8_1_3.png') no-repeat center/80%, #0b1536;");
html = html.replace(/url\('image\/jain_section8_1_5\.png'\) no-repeat center\/90%, #0b1536;/g, "url('image/jain_section8_1_5.png') no-repeat center/80%, #0b1536;");

fs.writeFileSync('index.html', html, 'utf8');
console.log('Specific icons reduced to 80%');