const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const bannerHTML = `
<!-- Custom HTML Floating Banner -->
<div class="custom-floating-banner">
    <ul class="floating-menu">
        <li>
            <a href="#">
                <div class="icon-placeholder"></div>
                <span>전화상담</span>
            </a>
        </li>
        <li>
            <a href="#">
                <div class="icon-placeholder"></div>
                <span>네이버예약</span>
            </a>
        </li>
        <li>
            <a href="#">
                <div class="icon-placeholder"></div>
                <span>네이버 블로그</span>
            </a>
        </li>
        <li>
            <a href="#">
                <div class="icon-placeholder"></div>
                <span>오시는 길</span>
            </a>
        </li>
    </ul>
    <a href="#" class="floating-top">TOP ▲</a>
</div>
`;

if (!html.includes('custom-floating-banner')) {
    html = html.replace('</body>', bannerHTML + '\n</body>');
    fs.writeFileSync('index.html', html, 'utf8');
    console.log('Custom floating banner added to HTML.');
} else {
    console.log('Custom floating banner already exists.');
}
