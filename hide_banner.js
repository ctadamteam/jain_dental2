const fs = require('fs');
let css = fs.readFileSync('css/style.css', 'utf8');

const targetStr = `.floating-banner {
    position: fixed;
    right: 200px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 9999;
    transition: transform 0.3s ease;
}`;

const replaceStr = `.floating-banner {
    display: none; /* Temporarily hidden */
    position: fixed;
    right: 200px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 9999;
    transition: transform 0.3s ease;
}`;

if (css.includes(targetStr)) {
    css = css.replace(targetStr, replaceStr);
    fs.writeFileSync('css/style.css', css, 'utf8');
    console.log('Floating banner temporarily hidden via CSS.');
} else {
    // try a more generic replacement in case the spacing is slightly off
    let replaced = css.replace('.floating-banner {', '.floating-banner {\n    display: none; /* Temporarily hidden */');
    fs.writeFileSync('css/style.css', replaced, 'utf8');
    console.log('Floating banner temporarily hidden (fallback).');
}
