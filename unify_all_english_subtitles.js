const fs = require('fs');

let css = fs.readFileSync('css/style.css', 'utf8');

const unifiedEnglishCss = `

/* ==========================================================================
   ALL SECTION JAIN DENTAL CLINIC ENGLISH SUBTITLE 100% UNIFIED SPEC
   ========================================================================== */

@media screen and (max-width: 768px) {
    .section-subtitle, .intro-subtitle, #special .section-subtitle {
        font-family: inherit !important;
        font-size: 20px !important;
        font-weight: 600 !important;
        color: #dcb37b !important;
        letter-spacing: 1px !important;
        text-transform: uppercase !important;
        text-align: center !important;
    }
}
`;

if (!css.includes('ALL SECTION JAIN DENTAL CLINIC ENGLISH SUBTITLE 100% UNIFIED SPEC')) {
    css += unifiedEnglishCss;
} else {
    css = css.replace(/\/\* ==========================================================================\s*ALL SECTION JAIN DENTAL CLINIC ENGLISH SUBTITLE 100% UNIFIED SPEC[\s\S]*$/g, unifiedEnglishCss.trim());
}

fs.writeFileSync('css/style.css', css, 'utf8');
console.log('All section English subtitles 100% unified successfully.');
