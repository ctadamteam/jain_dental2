const fs = require('fs');

// 1. Update index.html version query string to force immediate browser cache refresh
let html = fs.readFileSync('index.html', 'utf8');
const newVersion = 'v=' + Date.now();
html = html.replace(/css\/style\.css\?v=[^"']+/g, 'css/style.css?' + newVersion);
fs.writeFileSync('index.html', html, 'utf8');

// 2. Replace TMJ Hero mobile CSS with no dividers, gap: 12px, +20% for 맞춤형 치료 (38px), and -10% for 비수술 우선 (29px)
let css = fs.readFileSync('css/style.css', 'utf8');

const targetBlockStart = css.indexOf('/* ==========================================================================\n   DIRECTIVE: SECTION 8 TMJ HERO');
if (targetBlockStart !== -1) {
    css = css.substring(0, targetBlockStart);
}

const noDividersIndividualIconsCss = `/* ==========================================================================
   DIRECTIVE: SECTION 8 TMJ HERO (NO DIVIDERS + INDIVIDUAL ICON SCALING: MATCHUM +20% 38PX, NON-SURGERY -10% 29PX)
   ========================================================================== */

@media screen and (max-width: 768px) {
    #tmj .tmj-hero,
    .tmj-hero {
        min-height: auto !important;
        padding: 50px 0 50px 10px !important;
        background-position: 62% center !important; /* Woman image 100% fixed in current position */
        background-size: cover !important;
        opacity: 1 !important;
        filter: none !important;
    }

    #tmj .tmj-hero-content,
    .tmj-hero-content {
        margin-left: 0 !important;
        position: relative !important;
        left: 0 !important;
        transform: translateX(-35px) !important;
        width: 100% !important;
        max-width: 320px !important;
        text-align: left !important;
        padding-left: 0 !important;
    }

    #tmj .tmj-badge,
    .tmj-badge {
        width: auto !important;
        max-width: 100% !important;
        font-size: 16.5px !important;
        padding: 4px 10px !important;
        white-space: nowrap !important;
        margin: 0 0 5px 0 !important;
        display: inline-block !important;
        text-align: left !important;
        box-sizing: border-box !important;
    }

    #tmj .tmj-hero-content h2,
    .tmj-hero-content h2 {
        font-size: 28px !important;
        white-space: nowrap !important;
        margin-top: 0 !important;
        margin-bottom: 8px !important;
        text-align: left !important;
    }

    #tmj .tmj-hero-content p,
    .tmj-hero-content p {
        font-size: 17px !important;
        line-height: 1.55 !important;
        word-break: keep-all !important;
        text-align: left !important;
        margin-bottom: 18px !important;
        max-width: 100% !important;
    }

    #tmj .tmj-hero-content p br {
        display: inline !important;
    }

    #tmj .tmj-hero-list,
    .tmj-hero-list {
        display: flex !important;
        flex-direction: column !important; /* 1-Column Vertical Pure List */
        gap: 12px !important; /* Clean vertical spacing with NO dividers */
        margin-top: 16px !important;
        width: 100% !important;
        max-width: 175px !important;
        background: transparent !important; /* No background box */
        border: none !important;
        border-radius: 0 !important;
        padding: 0 !important;
        box-shadow: none !important;
        box-sizing: border-box !important;
    }

    #tmj .tmj-hero-list li,
    .tmj-hero-list li {
        display: flex !important;
        flex-direction: row !important;
        align-items: center !important;
        justify-content: flex-start !important;
        background: transparent !important;
        border: none !important; /* NO horizontal divider lines */
        padding: 0 !important;
        font-size: 15.5px !important;
        font-weight: 400 !important; /* Regular weight */
        color: #222222 !important; /* Crisp Black Text */
        box-shadow: none !important;
        white-space: nowrap !important;
    }

    #tmj .chk-icon,
    .chk-icon {
        width: 40px !important;
        height: 40px !important;
        min-width: 40px !important;
        background: transparent !important;
        border-radius: 0 !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        margin-right: 8px !important;
        margin-bottom: 0 !important;
    }

    #tmj .chk-icon img,
    .chk-icon img {
        width: 32px !important; /* Standard 32px icon */
        height: 32px !important;
        object-fit: contain !important;
        filter: brightness(0) saturate(100%) invert(14%) sepia(85%) saturate(1600%) hue-rotate(195deg) brightness(95%) contrast(98%) !important; /* Deep Navy #0d2b5b icon */
    }

    /* Individual Icon Custom Scaling */
    #tmj .chk-icon img[alt="맞춤형 치료"],
    .chk-icon img[alt="맞춤형 치료"] {
        width: 38px !important; /* +20% enlarged */
        height: 38px !important;
    }

    #tmj .chk-icon img[alt="비수술 우선"],
    .chk-icon img[alt="비수술 우선"] {
        width: 29px !important; /* -10% reduced */
        height: 29px !important;
    }
}
`;

css += noDividersIndividualIconsCss;
fs.writeFileSync('css/style.css', css, 'utf8');

console.log('Successfully removed dividers and applied individual icon scaling with version ' + newVersion);
