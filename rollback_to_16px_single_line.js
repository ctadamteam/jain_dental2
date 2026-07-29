const fs = require('fs');

// 1. Update index.html version query string to force immediate browser cache refresh
let html = fs.readFileSync('index.html', 'utf8');
const newVersion = 'v=' + Date.now();
html = html.replace(/css\/style\.css\?v=[^"']+/g, 'css/style.css?' + newVersion);
fs.writeFileSync('index.html', html, 'utf8');

// 2. Rollback .process-step rule in css/style.css to font-size 16px + letter-spacing -0.6px + nowrap
let css = fs.readFileSync('css/style.css', 'utf8');

// Remove the end rule and replace with 16px single line rule
const indexFix = css.indexOf('DIRECTIVE: PRESERVE COLOR BOX SIZE');
if (indexFix !== -1) {
    css = css.substring(0, css.lastIndexOf('/*', indexFix));
}

const rollbackRule = `
/* ==========================================================================
   DIRECTIVE: ROLLBACK PROCESS STEP TITLE BADGE FONT TO 16PX & SINGLE LINE FIT ON MOBILE
   ========================================================================== */

@media screen and (max-width: 768px) {
    .process-item .process-step,
    .process-grid .process-step,
    #conservation .process-item .process-step,
    #implant .process-item .process-step {
        font-size: 16px !important;
        letter-spacing: -0.6px !important;
        white-space: nowrap !important;
        padding-left: 2px !important;
        padding-right: 2px !important;
    }
}
`;

css += rollbackRule;
fs.writeFileSync('css/style.css', css, 'utf8');

console.log('Successfully rolled back process step font size to 16px for clean 1-line fit with version ' + newVersion);
