const fs = require('fs');
let css = fs.readFileSync('css/style.css', 'utf8');

const targetStr = `.custom-floating-banner {
    position: fixed;
    right: 100px;
    top: 50%;
    transform: translateY(-50%);
    width: 90px;`;
const replaceStr = `.custom-floating-banner {
    position: fixed;
    right: 100px;
    top: 50%;
    transform: translateY(-50%);
    width: 105px;`;

if (css.includes(targetStr)) {
    css = css.replace(targetStr, replaceStr);
    console.log('Banner width updated to 105px.');
} else {
    // Regex fallback
    let replaced = css.replace(/\.custom-floating-banner\s*\{[\s\S]*?width:\s*90px;/g, (match) => {
        return match.replace('width: 90px;', 'width: 105px;');
    });
    css = replaced;
    console.log('Banner width updated to 105px via regex.');
}

fs.writeFileSync('css/style.css', css, 'utf8');
