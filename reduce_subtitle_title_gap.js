const fs = require('fs');

let css = fs.readFileSync('css/style.css', 'utf8');

const gapReduceCss = `
    /* Reduce Gap Between English Subtitle & Main Title on Mobile */
    .intro-subtitle, .section-subtitle {
        font-size: 20px !important;
        margin-bottom: 4px !important;
    }
    .intro-title, .section-title {
        margin-top: 0 !important;
    }
`;

// Update or insert into mobile media query
css = css.replace(/(\/\* Mobile JAIN DENTAL CLINIC Subtitle Font Size -> 20px \*\/[\s\S]*?\.intro-subtitle, \.section-subtitle\s*\{[^\}]*\}|\.intro-subtitle, \.section-subtitle\s*\{\s*font-size:\s*20px\s*!important;\s*\})/g, gapReduceCss.trim());

fs.writeFileSync('css/style.css', css, 'utf8');
console.log('Gap between English subtitle and main title reduced on mobile.');
