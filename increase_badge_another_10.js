const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const targetStr = `<div class="tmj-badge" style="display:inline-block; font-size:20px; padding:12px 10px; width:315px; text-align:center; box-sizing:border-box; white-space:nowrap; letter-spacing:-0.5px;">구강악안면외과 전문의의 <span style="color:#C69D5D">맞춤형 치료</span></div>`;
const replaceStr = `<div class="tmj-badge" style="display:inline-block; font-size:20px; padding:12px 10px; width:325px; text-align:center; box-sizing:border-box; white-space:nowrap; letter-spacing:-0.5px;">구강악안면외과 전문의의 <span style="color:#C69D5D">맞춤형 치료</span></div>`;

if (html.includes(targetStr)) {
    html = html.replace(targetStr, replaceStr);
    fs.writeFileSync('index.html', html, 'utf8');
    console.log('Badge size increased by another 10px.');
} else {
    console.log('Target string not found.');
}
