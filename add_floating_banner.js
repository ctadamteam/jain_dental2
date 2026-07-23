const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const bannerHTML = `
<!-- Right Floating Banner -->
<div class="floating-banner">
    <a href="#" target="_blank">
        <img src="image/jain_floating.png" alt="상담 및 예약">
    </a>
</div>
`;

if (!html.includes('floating-banner')) {
    html = html.replace('</body>', bannerHTML + '\n</body>');
    fs.writeFileSync('index.html', html, 'utf8');
    console.log('Floating banner added to HTML.');
} else {
    console.log('Floating banner already exists.');
}
