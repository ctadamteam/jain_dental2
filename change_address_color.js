const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const targetStr = `<p style="font-size: 16px; line-height: 1.8; margin-bottom: 20px; font-weight: 300; color: #ffffff;">전북특별자치도 전주시 덕진구 백제대로 757 2층 자인치과<br>명주골네거리 (홈플러스 사거리) 대자인병원 맞은편</p>`;
const replaceStr = `<p style="font-size: 16px; line-height: 1.8; margin-bottom: 20px; font-weight: 300; color: #ffffff;">전북특별자치도 전주시 덕진구 백제대로 757 2층 자인치과<br><span style="color: #C69D5D;">명주골네거리 (홈플러스 사거리) 대자인병원 맞은편</span></p>`;

if (html.includes(targetStr)) {
    html = html.replace(targetStr, replaceStr);
    fs.writeFileSync('index.html', html, 'utf8');
    console.log('Address subtitle color updated.');
} else {
    console.log('Target string not found.');
}
