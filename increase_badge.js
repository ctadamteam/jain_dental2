const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const targetStr = `<div class="tmj-badge">구강악안면외과 전문의의 <span style="color:#C69D5D">맞춤형 치료</span></div>`;
const replaceStr = `<div class="tmj-badge" style="display:inline-block; font-size:22px; padding:12px 20px; width:410px; text-align:center;">구강악안면외과 전문의의 <span style="color:#C69D5D">맞춤형 치료</span></div>`;

if (html.includes(targetStr)) {
    html = html.replace(targetStr, replaceStr);
    fs.writeFileSync('index.html', html, 'utf8');
    console.log('Badge size increased.');
} else {
    console.log('Target string not found.');
}
