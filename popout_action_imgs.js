const fs = require('fs');

// 1. Update HTML
let html = fs.readFileSync('index.html', 'utf8');

const images = [
    'image/jain_section8_5_1.png',
    'image/jain_section8_5_2.png',
    'image/jain_section8_5_3.png',
    'image/jain_section8_5_4.png'
];

let i = 0;
// We will replace `<div class="action-img" style="background: url('...') center/cover no-repeat;"></div>`
html = html.replace(/<div class="action-img" style="background: url\('[^']+'\) center\/cover no-repeat;"><\/div>/g, () => {
    if (i < images.length) {
        const imgTag = `<div class="action-img">\n                                <img src="${images[i]}" alt="" class="action-overlay-img">\n                            </div>`;
        i++;
        return imgTag;
    }
    return `<div class="action-img"></div>`;
});

fs.writeFileSync('index.html', html);
console.log('HTML updated');

// 2. Update CSS
let css = fs.readFileSync('css/style.css', 'utf8');

const oldCss = `.action-img { width: 160px; height: 160px; background: #ddd; border-radius: 50%; margin: 0 auto 20px; }`;
const newCss = `.action-img { position: relative; width: 160px; height: 160px; background: #f5f5f5; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; }\n   .action-overlay-img { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 120%; max-width: none; z-index: 2; pointer-events: none; }`;

if (css.includes(oldCss)) {
    css = css.replace(oldCss, newCss);
    fs.writeFileSync('css/style.css', css);
    console.log('CSS updated');
} else {
    console.log('CSS target not found, might already be updated');
}