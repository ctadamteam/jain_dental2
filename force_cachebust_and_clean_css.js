const fs = require('fs');

// 1. Update index.html version query string to force immediate browser cache refresh
let html = fs.readFileSync('index.html', 'utf8');
const newVersion = 'v=' + Date.now();
html = html.replace(/css\/style\.css\?v=[^"']+/g, 'css/style.css?' + newVersion);
fs.writeFileSync('index.html', html, 'utf8');

// 2. Clean style.css and ensure the definitive 20px English subtitle rule is placed at the VERY END of style.css
let css = fs.readFileSync('css/style.css', 'utf8');

// Remove duplicate blocks if present
css = css.replace(/\/\* Force 20px & Gold Color for JAIN DENTAL CLINIC English Subtitle Across All Sections \*[\s\S]*$/g, '');
css = css.replace(/\/\* ==========================================================================\s*ALL SECTION JAIN DENTAL CLINIC ENGLISH SUBTITLE 100% UNIFIED SPEC[\s\S]*$/g, '');
css = css.replace(/\/\* ==========================================================================\s*PERFECT SECTION 1 MATCH[\s\S]*$/g, '');

const definitive20pxEnglishCss = `

/* ==========================================================================
   DEFINITIVE 20PX UNIFIED SPEC FOR ALL ENGLISH SUBTITLES (CACHE-BUSTED)
   ========================================================================== */

@media screen and (max-width: 768px) {
    .section-subtitle, 
    .intro-subtitle, 
    #special .section-subtitle,
    section .section-subtitle,
    p.section-subtitle,
    p.intro-subtitle {
        font-family: inherit !important;
        font-size: 20px !important; /* Strictly forced 20px across all mobile viewports */
        font-weight: 600 !important;
        color: #dcb37b !important;
        letter-spacing: 1px !important;
        text-transform: uppercase !important;
        text-align: center !important;
    }
}
`;

css += definitive20pxEnglishCss;

fs.writeFileSync('css/style.css', css, 'utf8');
console.log('Cachebust version ' + newVersion + ' applied to index.html and definitive 20px rule appended to style.css.');
