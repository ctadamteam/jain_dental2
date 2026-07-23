const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const targetStr = `<div class="tour-thumb" onclick="setTourImg(4)" style="flex: 1; cursor: pointer; overflow: hidden;">
                            <img src="image/jain_section9_5.png" alt="투어 썸네일 5" style="width: 100%; display: block; object-fit: cover; aspect-ratio: 4/3;">
                        </div>`;

html = html.replace(targetStr, '');

// Also remove from the array in the script
html = html.replace(",\n                        'image/jain_section9_5.png'", "");

fs.writeFileSync('index.html', html, 'utf8');
