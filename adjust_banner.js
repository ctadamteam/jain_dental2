const fs = require('fs');
let css = fs.readFileSync('css/style.css', 'utf8');

// 1. Move banner 50px further left (right: 50px -> right: 100px)
const bannerTargetStr = `.custom-floating-banner {
    position: fixed;
    right: 50px;`;
const bannerReplaceStr = `.custom-floating-banner {
    position: fixed;
    right: 100px;`;

if (css.includes(bannerTargetStr)) {
    css = css.replace(bannerTargetStr, bannerReplaceStr);
    console.log('Banner position updated (right: 100px).');
} else {
    css = css.replace(/right:\s*50px;/, 'right: 100px;');
    console.log('Banner position updated via regex.');
}

// 2. Reduce icon size by ~10% (45px -> 40px)
const iconTargetStr = `.floating-icon {
    width: 45px;
    height: 45px;`;
const iconReplaceStr = `.floating-icon {
    width: 40px;
    height: 40px;`;

if (css.includes(iconTargetStr)) {
    css = css.replace(iconTargetStr, iconReplaceStr);
    console.log('Icon size updated (40px).');
} else {
    let replacedIcon = css.replace(/\.floating-icon\s*\{\s*width:\s*45px;\s*height:\s*45px;/g, '.floating-icon {\n    width: 40px;\n    height: 40px;');
    css = replacedIcon;
    console.log('Icon size updated via regex.');
}

fs.writeFileSync('css/style.css', css, 'utf8');
