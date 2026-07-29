const fs = require('fs');

let css = fs.readFileSync('css/style.css', 'utf8');

const introTitleCenterCss = `
    /* Center align & reduce line spacing for Intro Title & Subtitle on Mobile */
    .intro-subtitle {
        text-align: center !important;
        margin-bottom: 2px !important;
    }
    .intro-title {
        text-align: center !important;
        line-height: 1.2 !important;
        margin-bottom: 20px !important;
    }
`;

// Insert into mobile media query
css = css.replace(/(\/\* Reduce Gap Between English Subtitle & Main Title on Mobile \*\/[\s\S]*?\.intro-title, \.section-title\s*\{[^\}]*\}|\.intro-title, \.section-title\s*\{\s*margin-top:\s*0\s*!important;\s*\})/g, `$1\n${introTitleCenterCss.trim()}`);

fs.writeFileSync('css/style.css', css, 'utf8');
console.log('Intro title & subtitle center aligned with reduced line height on mobile.');
