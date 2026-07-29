const fs = require('fs');

let css = fs.readFileSync('css/style.css', 'utf8');

// Add transform: translateY(6px) !important; to .logo-img on mobile
const nudgeCss = `
    .logo-img, .logo img {
        width: 170px !important;
        max-height: 38px !important;
        height: auto !important;
        object-fit: contain !important;
        display: block !important;
        margin: auto 0 !important;
        transform: translateY(6px) !important;
    }
`;

css = css.replace(/\.logo-img, \.logo img \{\s*width: 170px !important;[\s\S]*?\}/g, nudgeCss.trim());

fs.writeFileSync('css/style.css', css, 'utf8');
console.log('Mobile logo nudged down by 6px.');
