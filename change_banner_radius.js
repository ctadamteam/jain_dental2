const fs = require('fs');
let css = fs.readFileSync('css/style.css', 'utf8');

const targetStr = 'border-radius: 45px 45px 10px 10px;';
const replaceStr = 'border-radius: 15px;';

if (css.includes(targetStr)) {
    css = css.replace(targetStr, replaceStr);
    fs.writeFileSync('css/style.css', css, 'utf8');
    console.log('Border radius updated to a rounded rectangle.');
} else {
    // regex fallback just in case
    let replaced = css.replace(/border-radius:\s*45px\s+45px\s+10px\s+10px;/, replaceStr);
    fs.writeFileSync('css/style.css', replaced, 'utf8');
    console.log('Border radius updated (fallback).');
}
