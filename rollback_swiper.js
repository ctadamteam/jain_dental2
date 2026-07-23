const fs = require('fs');

// 1. Rollback index.html
let html = fs.readFileSync('index.html', 'utf8');

// Remove Swiper scripts and CSS from HEAD and body
html = html.replace('    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />\n', '');
html = html.replace('    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>\n', '');

// Remove the whole Swiper script block
const scriptRegex = /<script>\s*document\.addEventListener\('DOMContentLoaded', function \(\) \{[\s\S]*?\}\);\s*<\/script>\s*/;
if (html.match(scriptRegex)) {
    html = html.replace(scriptRegex, '');
}

// Replace the swiper DOM with the original layout
const swiperDomRegex = /<div class="tour-slider-wrapper mt-50">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;

const originalDom = `<div class="tour-slider mt-50">
                    <div class="arrow left"></div>
                    <div class="arrow right"></div>
                    <div class="tour-main-img">
                    </div>
                    <div class="tour-thumbs mt-20">
                        <div class="thumb"></div>
                        <div class="thumb"></div>
                        <div class="thumb"></div>
                        <div class="thumb"></div>
                        <div class="thumb"></div>
                    </div>
                </div>`;

if (html.match(swiperDomRegex)) {
    html = html.replace(swiperDomRegex, originalDom);
}

fs.writeFileSync('index.html', html);
console.log('HTML rollback complete.');

// 2. Rollback style.css
let css = fs.readFileSync('css/style.css', 'utf8');

const swiperCssRegex = /\.tour-slider-wrapper \{ position: relative; max-width: 1000px; margin: 0 auto; \}[\s\S]*?\.tour-arrow-right \{ right: -60px; border-top: 2px solid #ccc; border-right: 2px solid #ccc; transform: translateY\(-50%\) rotate\(45deg\); \}/;

const originalCss = `.tour-slider { max-width: 1000px; margin: 0 auto; position: relative; }
   .tour-main-img { width: 100%; height: 500px; background: #ddd; position: relative; }
   .arrow { position: absolute; top: 250px; transform: translateY(-50%); width: 30px; height: 30px; border-top: 2px solid #ccc; border-right: 2px solid #ccc; cursor: pointer; z-index: 10; }
   .arrow.left { left: -60px; transform: translateY(-50%) rotate(-135deg); }
   .arrow.right { right: -60px; transform: translateY(-50%) rotate(45deg); }
   .tour-thumbs { display: grid; grid-template-columns: repeat(5, 1fr); gap: 15px; }`;

if (css.match(swiperCssRegex)) {
    css = css.replace(swiperCssRegex, originalCss);
    fs.writeFileSync('css/style.css', css);
    console.log('CSS rollback complete.');
} else {
    console.log('Could not find CSS to rollback.');
}
