const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

// 1. Read index.tmp
let html = fs.readFileSync('index.tmp', 'utf8');

// 2. Read jsdom parsed elements
let stranded = fs.readFileSync('stranded_raw.html', 'utf8');
const domStranded = new JSDOM(stranded);
const docStranded = domStranded.window.document;

let i2Html = docStranded.getElementById('implant-2') ? docStranded.getElementById('implant-2').outerHTML : '';
let i3Html = docStranded.getElementById('implant-3') ? docStranded.getElementById('implant-3').outerHTML : '';
let ae2Html = docStranded.getElementById('ae-2') ? docStranded.getElementById('ae-2').outerHTML : '';
let ae3Html = docStranded.getElementById('ae-3') ? docStranded.getElementById('ae-3').outerHTML : '';

let fixed = fs.readFileSync('index_fixed.html', 'utf8');
const domFixed = new JSDOM(fixed);
const docFixed = domFixed.window.document;

// ae-1 is fully intact in index_fixed
let ae1Html = docFixed.getElementById('ae-1') ? docFixed.getElementById('ae-1').outerHTML : '';

// implant-1: in index_fixed, implant-1 contains the process section.
// We'll extract it carefully.
let i1Start = fixed.indexOf('<div id="implant-1"');
let i1End = fixed.indexOf('</div> <!-- end of implant-1 -->');
let i1Html = fixed.substring(i1Start, i1End) + '</div>';

// 3. Construct #implant section replacement
// We will replace everything from <!-- 5. 임플란트 --> to <!-- 6. 심미치료 -->
let implantTabsStr = `<!-- 5. 임플란트 -->
        <section id="implant" class="section">
            <div class="container">
                <p class="section-subtitle">JAIN DENTAL CLINIC</p>
                <h2 class="section-title">임플란트</h2>
                
                <div class="tab-container mt-80">
                    <div class="tab-buttons">
                        <button class="tab-btn active" data-tab="implant-1">즉시 임플란트</button>
                        <button class="tab-btn" data-tab="implant-2">3D컴퓨터 분석 임플란트</button>
                        <button class="tab-btn" data-tab="implant-3">상악동거상술 임플란트</button>
                    </div>
                    
                    <div class="tab-contents mt-40">
                        ${i1Html}
                        
                        ${i2Html}
                        
                        ${i3Html}
                    </div>
                </div>
            </div>
        </section>\n\n        `;

let s1 = html.indexOf('<!-- 5. 임플란트 -->');
let e1 = html.indexOf('<!-- 6. 심미치료 -->');
html = html.substring(0, s1) + implantTabsStr + html.substring(e1);

// 4. Construct #aesthetic section replacement
// In index.tmp, ae-1 was basically the original aesthetic section content.
// BUT we have a fixed aeGrid for ae-1 that we want to put inside ae-1.
// Let's create ae1Html using the fixed grid.
let newAeGrid = `<div class="aesthetic-grid">
                                    <div class="ae-card">
                                        <div class="ae-img" style="background: url('image/jain_section5_1.png') no-repeat center/cover;"></div>
                                        <div class="ae-text">
                                            <h4>자연치아와 유사한 심미성</h4>
                                            <p>투명감과 색감을 고려한 보철 제작으로<br>자연치아와 어우러지는 결과를 제공합니다.</p>
                                        </div>
                                    </div>
                                    <div class="ae-card">
                                        <div class="ae-img" style="background: url('image/jain_section5_2.png') no-repeat center/cover;"></div>
                                        <div class="ae-text">
                                            <h4>정밀하고 안정적인 치료</h4>
                                            <p>세밀한 진단과 계획을 통해<br>보다 안정적이고 만족도 높은 치료를 추구합니다.</p>
                                        </div>
                                    </div>
                                    <div class="ae-card">
                                        <div class="ae-img" style="background: url('image/jain_section5_3.png') no-repeat center/cover;"></div>
                                        <div class="ae-text">
                                            <h4>개인 맞춤 디자인</h4>
                                            <p>개인별 치아 비율과 얼굴 조화를 고려하여<br>맞춤형 심미 디자인을 진행합니다.</p>
                                        </div>
                                    </div>
                                    <div class="ae-card">
                                        <div class="ae-img" style="background: url('image/jain_section5_4.png') no-repeat center/cover;"></div>
                                        <div class="ae-text">
                                            <h4>자신감 있는 미소 회복</h4>
                                            <p>치아 콤플렉스를 개선하여<br>보다 밝고 자신 있는 일상에 도움을 드립니다.</p>
                                        </div>
                                    </div>
                                </div>`;

// Insert the newGrid into ae1Html
ae1Html = ae1Html.replace(/<div class="aesthetic-grid">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/, newAeGrid); // Very dangerous regex, let's just do it manually.

let aeTabsStr = `<!-- 6. 심미치료 -->
        <section id="aesthetic" class="section">
            <div class="container text-center mb-50">
                <p class="section-subtitle">JAIN DENTAL CLINIC</p>
                <h2 class="section-title">심미치료</h2>
            </div>
            
            <div class="container">
                <div class="tab-container mt-80">
                    <div class="tab-buttons">
                        <button class="tab-btn active" data-tab="ae-1">앞니 벌어짐 레진치료</button>
                        <button class="tab-btn" data-tab="ae-2">앞니 재보철</button>
                        <button class="tab-btn" data-tab="ae-3">치아미백</button>
                    </div>
                    
                    <div class="tab-contents mt-40">
                        ${ae1Html}
                        
                        ${ae2Html}
                        
                        ${ae3Html}
                    </div>
                </div>
            </div>
        </section>\n\n        `;

let s2 = html.indexOf('<!-- 6. 심미치료 -->');
let e2 = html.indexOf('<!-- 7. 투명교정 -->');
html = html.substring(0, s2) + aeTabsStr + html.substring(e2);

// 5. Apply image adjustments to T-Scan and RayFace
html = html.replace(
    /<div class="special-img" style="background: url\('image\/special_ray.png'\) no-repeat center\/contain;"><\/div>/,
    `<div class="special-img" style="background: url('image/special_ray.png') no-repeat center/contain; position: relative; left: 5px; bottom: -80px;"></div>`
);
html = html.replace(
    /<div class="special-img" style="background: url\('image\/special_tscan.png'\) no-repeat center\/contain;"><\/div>/,
    `<div class="special-img" style="background: url('image/special_tscan.png') no-repeat center/contain; position: relative; left: 5px; bottom: -80px;"></div>`
);

// We need to make sure ae1Html was correct.
// Since the regex might have been bad, I will manually build ae1Html here just to be bulletproof.
