const fs = require('fs');

let css = fs.readFileSync('css/style.css', 'utf8');
if (!css.includes('.inj-overlay-img')) {
    const newCssStyles = `
   .tmj-inj-icon { position: relative; width: 120px; height: 120px; border-radius: 50%; background: #eee; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
   .inj-overlay-img { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 120%; max-width: none; z-index: 2; pointer-events: none; }`;
    
    // Replace old .tmj-inj-icon
    css = css.replace('.tmj-inj-icon { width: 120px; height: 120px; border-radius: 50%; background: #eee; flex-shrink: 0; }', newCssStyles.trim());
    fs.writeFileSync('css/style.css', css);
}

let html = fs.readFileSync('index.html', 'utf8');

const images = [
    'image/jain_section8_4_3_1.png',
    'image/jain_section8_4_3_2.png',
    'image/jain_section8_4_3_3.png',
    'image/jain_section8_4_3_4.png',
    'image/jain_section8_4_3_5.png',
    'image/jain_section8_4_3_6.png',
    'image/jain_section8_4_3_7.png'
];

let i = 0;
// We will replace <div class="tmj-inj-icon"></div> sequentially
html = html.replace(/<div class="tmj-inj-icon"><\/div>/g, () => {
    if (i < images.length) {
        const imgTag = `<div class="tmj-inj-icon">\n                                            <img src="${images[i]}" alt="" class="inj-overlay-img">\n                                        </div>`;
        i++;
        return imgTag;
    }
    return `<div class="tmj-inj-icon"></div>`;
});

fs.writeFileSync('index.html', html);
console.log('Injection images added successfully');