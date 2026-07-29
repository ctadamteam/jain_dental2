const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const oldPdrnRegex = /<div class="bg-light py-80 mt-60">\s*<div class="container">\s*<div class="con-info-section">\s*<h4 class="text-center mb-40" style="font-size:26px; font-weight:700;">PDRN 주사의 <span class="text-blue">원리<\/span><\/h4>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/;

const newPdrnHtml = `<div class="implant-process-section mt-100">
                        <div class="container">
                            <h4 class="implant-tab-title">PDRN 주사의 <span class="text-blue">원리</span></h4>
                            <div class="process-grid">
                                <div class="process-item">
                                    <div class="process-img" style="background: url('image/conservation4_1_1.png') no-repeat center/cover;"></div>
                                    <div class="process-step bg-blue">조직 재생 촉진</div>
                                    <p>손상된 잇몸 조직의 회복 과정에 도움을 줍니다.</p>
                                </div>
                                <div class="process-item">
                                    <div class="process-img" style="background: url('image/conservation4_1_2.png') no-repeat center/cover;"></div>
                                    <div class="process-step bg-gold">혈관 생성 촉진</div>
                                    <p>조직 회복에 필요한 혈류와 영양 공급을 돕습니다.</p>
                                </div>
                                <div class="process-item">
                                    <div class="process-img" style="background: url('image/conservation4_1_3.png') no-repeat center/cover;"></div>
                                    <div class="process-step bg-blue">섬유아세포 활성</div>
                                    <p>잇몸 조직을 구성하는 세포의 활동을 촉진합니다.</p>
                                </div>
                                <div class="process-item">
                                    <div class="process-img" style="background: url('image/conservation4_1_4.png') no-repeat center/cover;"></div>
                                    <div class="process-step bg-gold">염증 반응 완화</div>
                                    <p>치아와 임플란트 주변의 염증 및 부종 완화에 도움을 줄 수 있습니다.</p>
                                </div>
                            </div>
                        </div>
                    </div>`;

if (oldPdrnRegex.test(html)) {
    html = html.replace(oldPdrnRegex, newPdrnHtml);
    const newVersion = 'v=' + Date.now();
    html = html.replace(/css\/style\.css\?v=[^"']+/g, 'css/style.css?' + newVersion);
    fs.writeFileSync('index.html', html, 'utf8');
    console.log('Successfully converted Section 7 Tab 4 PDRN Principle layout to implant-process-section!');
} else {
    console.log('Regex match failed for PDRN Principle!');
}
