const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const stringsToReplace = [
    '<h4 style="color: #C69D5D; font-size: 24px; font-weight: 700; margin-bottom: 25px;">상담 및 예약</h4>',
    '<h4 style="color: #C69D5D; font-size: 24px; font-weight: 700; margin-bottom: 25px;">진료시간</h4>',
    '<h4 style="color: #C69D5D; font-size: 24px; font-weight: 700; margin-bottom: 25px;">오시는 길</h4>'
];

let replaced = 0;
stringsToReplace.forEach(str => {
    if (html.includes(str)) {
        html = html.replace(str, str.replace('font-size: 24px;', 'font-size: 25px;'));
        replaced++;
    }
});

if (replaced > 0) {
    fs.writeFileSync('index.html', html, 'utf8');
    console.log('Successfully updated ' + replaced + ' headings.');
} else {
    console.log('Target strings not found.');
}
