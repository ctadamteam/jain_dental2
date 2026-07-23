const fs = require('fs');
const oldHtml = fs.readFileSync('recovered_html.html', 'utf8');
const currentHtml = fs.readFileSync('index.html', 'utf8');

// The missing part is exactly what was between:
// <div class="tab-contents"> inside section#special
// AND
// <div class="tab-contents"> inside section#implant

// Let's get the exact missing part from recovered_html.html.
// We want everything from `<div id="special-3" class="tab-pane active">`
// up to just before `<div class="tab-contents">` of the implant section.

const missingPartMatch = oldHtml.match(/(<div id="special-3"[\s\S]*?)<div class="tab-contents">/);
if (!missingPartMatch) {
    console.log("Failed to match missing part in recovered_html.html");
    process.exit(1);
}

const missingPart = missingPartMatch[1]; // This goes up to <div class="tab-buttons text-style"> ... </div> of implant section

// Now in currentHtml, we find where it got merged.
// It looks like:
//                     <div class="tab-contents">
//                         <!-- TAB 1: 즉시 임플란트 -->
//                         <div id="implant-1" class="tab-pane active">

const splitStr = '                    <div class="tab-contents">\n                        <!-- TAB 1: 즉시 임플란트 -->';

const parts = currentHtml.split(splitStr);
if (parts.length !== 2) {
    console.log("Failed to split currentHtml");
    process.exit(1);
}

const fixedHtml = parts[0] + missingPart + '                    <div class="tab-contents">\n                        <!-- TAB 1: 즉시 임플란트 -->' + parts[1];

fs.writeFileSync('index.html', fixedHtml, 'utf8');
console.log("Successfully restored Sections 2, 3, and 4!");
