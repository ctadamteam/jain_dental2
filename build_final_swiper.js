const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Add Swiper CSS if not exists
if (!html.includes('swiper-bundle.min.css')) {
    html = html.replace('</head>', '    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />\n</head>');
}

// 2. Replace the old tour-slider with the Swiper wrapper
const oldHtmlRegex = /<div class="tour-slider mt-50">[\s\S]*?<\/div>\s*<\/div>/;

const newHtml = `<div class="tour-slider-wrapper mt-50">
                    <div class="swiper tour-main-swiper">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide"><img src="image/jain_section9_1.png" alt="둘러보기 1" style="width: 100%; height: 500px; object-fit: cover;"></div>
                            <div class="swiper-slide"><img src="image/jain_section9_2.png" alt="둘러보기 2" style="width: 100%; height: 500px; object-fit: cover;"></div>
                            <div class="swiper-slide"><img src="image/jain_section9_3.png" alt="둘러보기 3" style="width: 100%; height: 500px; object-fit: cover;"></div>
                            <div class="swiper-slide"><img src="image/jain_section9_4.png" alt="둘러보기 4" style="width: 100%; height: 500px; object-fit: cover;"></div>
                            <div class="swiper-slide"><img src="image/jain_section9_5.png" alt="둘러보기 5" style="width: 100%; height: 500px; object-fit: cover;"></div>
                        </div>
                    </div>
                    <div class="tour-arrow-left"></div>
                    <div class="tour-arrow-right"></div>
                    
                    <div class="swiper tour-thumbs-swiper mt-20">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide"><div class="thumb" style="background: url('image/jain_section9_1.png') center/cover no-repeat; width: 100%; height: 120px;"></div></div>
                            <div class="swiper-slide"><div class="thumb" style="background: url('image/jain_section9_2.png') center/cover no-repeat; width: 100%; height: 120px;"></div></div>
                            <div class="swiper-slide"><div class="thumb" style="background: url('image/jain_section9_3.png') center/cover no-repeat; width: 100%; height: 120px;"></div></div>
                            <div class="swiper-slide"><div class="thumb" style="background: url('image/jain_section9_4.png') center/cover no-repeat; width: 100%; height: 120px;"></div></div>
                            <div class="swiper-slide"><div class="thumb" style="background: url('image/jain_section9_5.png') center/cover no-repeat; width: 100%; height: 120px;"></div></div>
                        </div>
                    </div>
                </div>`;

if (html.match(oldHtmlRegex)) {
    html = html.replace(oldHtmlRegex, newHtml);
} else {
    console.log("Could not find the HTML block to replace.");
}

// 3. Add Swiper JS and initialization script right before </body>
const scriptContent = `
    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            // 하단 썸네일 (무한 루프 컨베이어 벨트)
            var tourThumbs = new Swiper('.tour-thumbs-swiper', {
                spaceBetween: 15,
                slidesPerView: 5,
                loop: true,
                loopedSlides: 5, // 필수: 복제본 개수를 지정하여 스크롤 강제 활성화
                slideToClickedSlide: true, // 클릭 시 무조건 맨 왼쪽으로 이동
                watchSlidesProgress: true,
            });

            // 상단 메인 슬라이더
            var tourMain = new Swiper('.tour-main-swiper', {
                spaceBetween: 10,
                loop: true,
                loopedSlides: 5, // 썸네일과 동일하게 설정하여 DOM 인덱스 1:1 매칭
                navigation: {
                    nextEl: '.tour-arrow-right',
                    prevEl: '.tour-arrow-left',
                },
            });

            // 네이티브 컨트롤러 양방향 연결 (최강의 안정성, 엇박자 절대 없음)
            tourMain.controller.control = tourThumbs;
            tourThumbs.controller.control = tourMain;
        });
    </script>
</body>`;

// Remove old script if exists to avoid duplicates
html = html.replace(/<script src="https:\/\/cdn\.jsdelivr\.net\/npm\/swiper@11\/swiper-bundle\.min\.js"><\/script>\s*<script>[\s\S]*?tour-thumbs-swiper[\s\S]*?<\/script>/, '');

if (!html.includes('tour-thumbs-swiper", {')) {
    html = html.replace('</body>', scriptContent);
}

fs.writeFileSync('index.html', html);
console.log('HTML and JS successfully written.');


// 4. Update CSS
let css = fs.readFileSync('css/style.css', 'utf8');

const oldCssRegex = /\.tour-slider \{ max-width: 1000px; margin: 0 auto; position: relative; \}[\s\S]*?\.tour-slider \.arrow\.right \{ right: -50px; transform: rotate\(45deg\); \}/;

const newCss = `.tour-slider-wrapper { position: relative; max-width: 1000px; margin: 0 auto; }
.tour-main-swiper { width: 100%; background: #ddd; }
.tour-thumbs-swiper { width: 100%; }
.tour-thumbs-swiper .swiper-slide { opacity: 0.4; transition: opacity 0.3s; cursor: pointer; box-sizing: border-box; border: 2px solid transparent; }
/* 맨 왼쪽으로 오게 되는 Active 슬라이드에만 테두리 및 투명도 100% 적용 */
.tour-thumbs-swiper .swiper-slide-active { opacity: 1; border: 2px solid #0b1536; }

.tour-arrow-left, .tour-arrow-right { position: absolute; top: 250px; width: 30px; height: 30px; z-index: 10; cursor: pointer; }
.tour-arrow-left { left: -60px; border-top: 2px solid #ccc; border-right: 2px solid #ccc; transform: translateY(-50%) rotate(-135deg); }
.tour-arrow-right { right: -60px; border-top: 2px solid #ccc; border-right: 2px solid #ccc; transform: translateY(-50%) rotate(45deg); }`;

if (css.match(oldCssRegex)) {
    css = css.replace(oldCssRegex, newCss);
    fs.writeFileSync('css/style.css', css);
    console.log('CSS successfully written.');
} else {
    // If the old CSS was already removed or didn't match perfectly, just append it
    if (!css.includes('.tour-slider-wrapper { position: relative; max-width: 1000px;')) {
        css += '\n' + newCss + '\n';
        fs.writeFileSync('css/style.css', css);
        console.log('CSS appended.');
    } else {
        console.log('CSS already exists.');
    }
}
