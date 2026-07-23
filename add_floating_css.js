const fs = require('fs');
let css = fs.readFileSync('css/style.css', 'utf8');

const bannerCSS = `
/* Floating Banner */
.floating-banner {
    position: fixed;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 9999;
    transition: transform 0.3s ease;
}
.floating-banner:hover {
    transform: translateY(calc(-50% - 5px));
}
.floating-banner img {
    width: 100%;
    max-width: 130px;
    height: auto;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.15);
}

@media (max-width: 768px) {
    .floating-banner {
        display: none;
    }
}
`;

if (!css.includes('.floating-banner')) {
    fs.appendFileSync('css/style.css', bannerCSS, 'utf8');
    console.log('Floating banner CSS appended.');
} else {
    console.log('Floating banner CSS already exists.');
}
