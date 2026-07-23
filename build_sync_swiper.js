const fs = require('fs');

// 1. Update index.html
let html = fs.readFileSync('index.html', 'utf8');

// A. Insert Swiper CSS in head if not exists
if (!html.includes('swiper-bundle.min.css')) {
    html = html.replace('</head>', '    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />\n</head>');
}

// B. Replace the gallery HTML
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
    console.log("Could not find the exact old HTML block to replace.");
}

// C. Insert Swiper JS and our custom logic before </body> if not exists
if (!html.includes('tourThumbs')) {
    const swiperInitScript = `
    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            // 1. 썸네일 슬라이더 (가장 왼쪽이 Active)
            var tourThumbs = new Swiper('.tour-thumbs-swiper', {
                spaceBetween: 15,
                slidesPerView: 5,
                loop: true,
                watchSlidesProgress: true,
                slideToClickedSlide: true, // 클릭 시 맨 왼쪽으로 스크롤됨
            });

            // 2. 메인 슬라이더
            var tourMain = new Swiper('.tour-main-swiper', {
                spaceBetween: 10,
                loop: true,
            });

            // 3. 커스텀 액티브 상태(진한 테두리) 표시 함수
            function updateThumbClass() {
                var realIndex = tourMain.realIndex;
                document.querySelectorAll('.tour-thumbs-swiper .swiper-slide').forEach(function(el) {
                    el.classList.remove('swiper-slide-thumb-active');
                });
                document.querySelectorAll('.tour-thumbs-swiper .swiper-slide[data-swiper-slide-index="'+realIndex+'"]').forEach(function(el) {
                    el.classList.add('swiper-slide-thumb-active');
                });
            }

            // 4. 시나리오 A: 하단 썸네일 직접 클릭 시 동기화
            tourThumbs.on('click', function () {
                if (typeof tourThumbs.clickedIndex !== 'undefined') {
                    // 클릭된 슬라이드의 고유번호 추출
                    var slideEl = tourThumbs.slides[tourThumbs.clickedIndex];
                    if (!slideEl) return;
                    var sourceReal = parseInt(slideEl.getAttribute('data-swiper-slide-index'));
                    var targetReal = tourMain.realIndex;
                    var diff = sourceReal - targetReal;
                    var total = 5;
                    
                    // 최단 경로 계산 (뒤로 감김 방지)
                    if (diff > total / 2) diff -= total;
                    if (diff < -total / 2) diff += total;
                    
                    if (diff !== 0) {
                        tourMain.slideTo(tourMain.activeIndex + diff);
                    }
                }
            });

            // 5. 시나리오 B: 상단 화살표 클릭 시 동기화 (직접 제어)
            document.querySelector('.tour-arrow-right').addEventListener('click', function() {
                tourMain.slideNext();
                tourThumbs.slideNext();
            });
            document.querySelector('.tour-arrow-left').addEventListener('click', function() {
                tourMain.slidePrev();
                tourThumbs.slidePrev();
            });

            // 6. 스와이프(터치) 시 동기화 (에러 방지를 위해 트랜지션 종료 후 안전하게 실행)
            tourMain.on('slideChangeTransitionEnd', function () {
                var sourceReal = tourMain.realIndex;
                var targetReal = tourThumbs.realIndex;
                var diff = sourceReal - targetReal;
                var total = 5;
                
                if (diff > total / 2) diff -= total;
                if (diff < -total / 2) diff += total;
                
                if (diff !== 0) {
                    tourThumbs.slideTo(tourThumbs.activeIndex + diff);
                }
                updateThumbClass();
            });

            // 초기 액티브 클래스 적용
            setTimeout(updateThumbClass, 50);
        });
    </script>
</body>`;
    
    // 만약 예전 스크립트가 있다면 지우고 넣기 위해, 그냥 </body> 앞에 넣는다.
    html = html.replace('</body>', swiperInitScript);
}

fs.writeFileSync('index.html', html);
console.log('HTML and JS successfully rebuilt');

// 2. Update CSS
let css = fs.readFileSync('css/style.css', 'utf8');

const oldCssRegex = /\.tour-slider \{ max-width: 1000px; margin: 0 auto; position: relative; \}[\s\S]*?\.tour-thumbs \{ display: grid; grid-template-columns: repeat\(5, 1fr\); gap: 15px; \}/;

const newCss = `.tour-slider-wrapper { position: relative; max-width: 1000px; margin: 0 auto; }
   .tour-main-swiper { width: 100%; background: #ddd; }
   .tour-thumbs-swiper { width: 100%; }
   .tour-thumbs-swiper .swiper-slide { opacity: 0.4; transition: opacity 0.3s; cursor: pointer; }
   .tour-thumbs-swiper .swiper-slide-thumb-active { opacity: 1; border: 2px solid #0b1536; box-sizing: border-box; }
   
   .tour-arrow-left, .tour-arrow-right { position: absolute; top: 250px; width: 30px; height: 30px; z-index: 10; cursor: pointer; }
   .tour-arrow-left { left: -60px; border-top: 2px solid #ccc; border-right: 2px solid #ccc; transform: translateY(-50%) rotate(-135deg); }
   .tour-arrow-right { right: -60px; border-top: 2px solid #ccc; border-right: 2px solid #ccc; transform: translateY(-50%) rotate(45deg); }`;

if (css.match(oldCssRegex)) {
    css = css.replace(oldCssRegex, newCss);
    fs.writeFileSync('css/style.css', css);
    console.log('CSS successfully rebuilt');
} else {
    console.log('Could not find CSS to replace');
}
