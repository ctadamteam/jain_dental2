const fs = require('fs');

// 1. Update HTML
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(
    '<h3><span style="font-size: 28px; font-weight: 500;">턱 불편함이 계속된다면</span><br>',
    '<h3><span style="font-size: 25px; font-weight: 500;">턱 불편함이 계속된다면</span><br>'
);

html = html.replace(
    '<span style="font-size: 28px; font-weight: 700;">지금 상담하세요</span></h3>',
    '<span style="font-size: 25px; font-weight: 700;">지금 상담하세요</span></h3>'
);

fs.writeFileSync('index.html', html);
console.log('HTML updated');

// 2. Update CSS
let css = fs.readFileSync('css/style.css', 'utf8');

// Move right by 300px (from -500px to -200px)
css = css.replace(
    '.tmj-cta-content { text-align: left; max-width: 450px; margin: 0 auto; transform: translateX(-500px); }',
    '.tmj-cta-content { text-align: left; max-width: 450px; margin: 0 auto; transform: translateX(-200px); }'
);

// Decrease margin-top by 8px (from 35px to 27px)
css = css.replace(
    '.cta-buttons { display: flex; flex-direction: column; justify-content: flex-start; gap: 10px; margin-top: 35px !important; }',
    '.cta-buttons { display: flex; flex-direction: column; justify-content: flex-start; gap: 10px; margin-top: 27px !important; }'
);

fs.writeFileSync('css/style.css', css);
console.log('CSS updated');