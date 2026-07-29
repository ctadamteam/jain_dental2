const fs = require('fs');

let css = fs.readFileSync('css/style.css', 'utf8');

// Replace width 130px and max-height 28px with 155px and 34px
css = css.replace(/width:\s*130px\s*!important;/g, 'width: 155px !important;');
css = css.replace(/max-height:\s*28px\s*!important;/g, 'max-height: 34px !important;');
css = css.replace(/width:\s*135px\s*!important;/g, 'width: 155px !important;');

fs.writeFileSync('css/style.css', css, 'utf8');
console.log('Mobile logo size adjusted to width: 155px, max-height: 34px.');
