const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const styleBlock = `                                <style>
                                    /* 카카오맵 하단 정보창 숨기기 및 지도 영역 100% 확장 */
                                    .loc-map .root_daum_roughmap .wrap_controllers { display: none !important; }
                                    .loc-map .root_daum_roughmap .wrap_map { height: 100% !important; }
                                </style>\n`;

html = html.replace(styleBlock, '');

const locMapStart = `<div class="loc-map" style="flex: 1; min-width: 50%; min-height: 500px; position: relative;">`;
const locMapWithStyle = `<div class="loc-map" style="flex: 1; min-width: 50%; min-height: 500px; position: relative;">
                    <style>
                        /* 카카오맵 하단 정보창 숨기기 및 지도 영역 100% 확장 */
                        .loc-map .root_daum_roughmap .wrap_controllers { display: none !important; }
                        .loc-map .root_daum_roughmap .wrap_map { height: 100% !important; }
                    </style>`;

if (html.includes(locMapStart)) {
    html = html.replace(locMapStart, locMapWithStyle);
    fs.writeFileSync('index.html', html, 'utf8');
    console.log('Moved style block to the correct place.');
} else {
    console.log('loc-map start not found.');
}
