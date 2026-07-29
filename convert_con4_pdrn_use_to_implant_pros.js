const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const oldPdrnUseRegex = /<div class="container mt-80">\s*<h4 class="text-center mb-40" style="font-size:26px; font-weight:700;">치과에서는 <span class="text-blue">언제 PDRN 주사<\/span>를 사용할까요\?<\/h4>[\s\S]*?<\/ul>\s*<\/div>/;

const newPdrnUseHtml = `<div class="container mt-80">
                        <h4 class="implant-tab-title">치과에서는 <span class="text-blue">언제 PDRN 주사</span>를 사용할까요?</h4>
                        <ul class="implant-pros">
                            <li>
                                <div class="pro-title"><span class="num">1</span> 임플란트 수술 후</div>
                                <div class="pro-desc">임플란트 수술 후에는 잇몸과 주변 조직이 회복되는 과정이 필요합니다. 이때 조직 회복을 보조하기 위한 목적으로 PDRN 주사를 고려할 수 있습니다.</div>
                            </li>
                            <li>
                                <div class="pro-title"><span class="num">2</span> 잇몸 수술 후</div>
                                <div class="pro-desc">치주치료나 잇몸 수술 후에는 손상된 잇몸 조직의 회복과 관리가 중요합니다. 환자의 잇몸 상태에 따라 회복 과정을 보조하는 방법으로 활용될 수 있습니다.</div>
                            </li>
                            <li>
                                <div class="pro-title"><span class="num">3</span> 잇몸이 약한 경우</div>
                                <div class="pro-desc">잇몸이 얇거나 약한 경우, 잇몸이 자주 붓고 출혈이 반복되는 경우에도 조직 관리를 위한 방법 중 하나로 고려할 수 있습니다.</div>
                            </li>
                        </ul>`;

if (oldPdrnUseRegex.test(html)) {
    html = html.replace(oldPdrnUseRegex, newPdrnUseHtml);
    const newVersion = 'v=' + Date.now();
    html = html.replace(/css\/style\.css\?v=[^"']+/g, 'css/style.css?' + newVersion);
    fs.writeFileSync('index.html', html, 'utf8');
    console.log('Successfully converted Section 7 Tab 4 PDRN Use section to ul.implant-pros structure!');
} else {
    console.log('Regex match failed!');
}
