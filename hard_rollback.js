const fs = require('fs');

// 1. Update index.html
let html = fs.readFileSync('index.html', 'utf8');

// A. Remove Swiper CSS
html = html.replace('    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />\n', '');

// B. Revert the HTML block
const swiperHtmlRegex = /<div class="tour-slider-wrapper mt-50">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;

const originalHtml = `<div class="tour-slider mt-50">
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

if (html.match(swiperHtmlRegex)) {
    html = html.replace(swiperHtmlRegex, originalHtml);
}

// C. Remove Swiper JS and script
const scriptRegex = /<script src="https:\/\/cdn\.jsdelivr\.net\/npm\/swiper@11\/swiper-bundle\.min\.js"><\/script>\s*<script>[\s\S]*?\/\/ 1\. 썸네일 슬라이더[\s\S]*?<\/script>/;
if (html.match(scriptRegex)) {
    html = html.replace(scriptRegex, '');
}

fs.writeFileSync('index.html', html);
console.log('HTML rollback complete.');

// 2. Update CSS
let css = fs.readFileSync('css/style.css', 'utf8');

const newCssRegex = /\.tour-slider-wrapper \{ position: relative; max-width: 1000px; margin: 0 auto; \}[\s\S]*?\.tour-thumbs-swiper \.swiper-slide-active \{ opacity: 1; border: 2px solid #0b1536; \}/;

const originalCss = `.tour-slider { max-width: 1000px; margin: 0 auto; position: relative; }
.tour-main-img { width: 100%; height: 500px; background-color: #e0e0e0; margin-bottom: 20px; }
.tour-thumbs { display: grid; grid-template-columns: repeat(5, 1fr); gap: 15px; }
.tour-thumbs .thumb { height: 120px; background-color: #cccccc; cursor: pointer; transition: all 0.3s ease; }
.tour-thumbs .thumb:hover { opacity: 0.8; }
.tour-slider .arrow { position: absolute; top: 250px; width: 30px; height: 30px; cursor: pointer; border-top: 2px solid #ccc; border-right: 2px solid #ccc; }
.tour-slider .arrow.left { left: -50px; transform: rotate(-135deg); }
.tour-slider .arrow.right { right: -50px; transform: rotate(45deg); }`;

if (css.match(newCssRegex)) {
    css = css.replace(newCssRegex, originalCss);
    fs.writeFileSync('css/style.css', css);
    console.log('CSS rollback complete.');
} else {
    console.log('Could not find CSS to replace.');
}
