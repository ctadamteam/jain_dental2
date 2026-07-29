const fs = require('fs');

// 1. Update index.html version query string to force immediate browser cache refresh
let html = fs.readFileSync('index.html', 'utf8');
const newVersion = 'v=' + Date.now();
html = html.replace(/css\/style\.css\?v=[^"']+/g, 'css/style.css?' + newVersion);
fs.writeFileSync('index.html', html, 'utf8');

// 2. Update css/style.css with margin-top: 20px (shifting UP by 30px)
let css = fs.readFileSync('css/style.css', 'utf8');

css = css.replace(`margin-top: 64px !important; /* Shifted down by 50px */`, `margin-top: 20px !important;`);
css = css.replace(
`    #tmj .tmj-hero-content p,
    .tmj-hero-content p {
        font-size: 17px !important;`,
`    #tmj .tmj-hero-content p,
    .tmj-hero-content p {
        margin-top: 20px !important; /* Shifted UP by 30px */
        font-size: 17px !important;`
);

fs.writeFileSync('css/style.css', css, 'utf8');

console.log('Successfully shifted description text & icons UP by 30px with version ' + newVersion);
