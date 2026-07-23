const fs = require('fs');
let recovered = fs.readFileSync('recovered_html.html', 'utf8');
let current = fs.readFileSync('index.html', 'utf8');

// The recovered html goes from <!-- 3. 자인치과 특별함 --> up to </section> of #implant.
// But we need from <!-- 1. 상단/네비 --> to the end of <!-- 2. 자인치과 소개 --> as well!
// Let's get that from currentHtml.
const split1 = current.indexOf('        <!-- 3. 자인치과 특별함 -->');
const part1 = current.substring(0, split1);

const split2 = current.indexOf('        <!-- 6. 심미치료 -->');
const part3 = current.substring(split2);

// Now we need to add the inline styles to the 4 ig-imgs in recovered
recovered = recovered.replace('<div class="ig-img"></div>', '<div class="ig-img" style="background-image: url(\'./image/jain_section4_1.png\');"></div>');
recovered = recovered.replace('<div class="ig-img"></div>', '<div class="ig-img" style="background-image: url(\'./image/jain_section4_2.png\');"></div>');
recovered = recovered.replace('<div class="ig-img"></div>', '<div class="ig-img" style="background-image: url(\'./image/jain_section4_3.png\');"></div>');
recovered = recovered.replace('<div class="ig-img"></div>', '<div class="ig-img" style="background-image: url(\'./image/jain_section4_4.png\');"></div>');

const fullHtml = part1 + recovered + '\n' + part3;

fs.writeFileSync('index.html', fullHtml, 'utf8');
console.log('Restored index.html');
