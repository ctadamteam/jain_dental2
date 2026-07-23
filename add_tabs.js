const fs = require('fs');

// Update CSS
let css = fs.readFileSync('css/style.css', 'utf8');
const newCss = `
   .tmj-inj-list { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; max-width: 1000px; margin: 0 auto; text-align: left; }
   .tmj-inj-item { background: #f9f9f9; padding: 25px 30px; border-radius: 10px; border: 1px solid #e1e1e1; }
   .tmj-inj-item .inj-title { font-size: 20px; font-weight: 700; color: #0b1536; margin-bottom: 15px; display: inline-block; border-bottom: 2px solid #0b1536; padding-bottom: 5px; }
   .tmj-inj-item .inj-desc { font-size: 16px; color: #444; line-height: 1.6; word-break: keep-all; letter-spacing: -0.5px; }
`;
if (!css.includes('.tmj-inj-list')) {
  css = css.replace('.tmj-tab-hero {', newCss + '\n   .tmj-tab-hero {');
  fs.writeFileSync('css/style.css', css);
}

// Update HTML
let html = fs.readFileSync('index.html', 'utf8');
const tab1End = `</p>\n                            </div>`;
const newTabs = `</p>
                            </div>
                            
                            <!-- TAB 2: 스플린트 -->
                            <div id="tmj-t-2" class="tab-pane">
                                <div class="tmj-tab-hero"></div>
                                <div class="tmj-tab-badge mt-40">턱관절 스플린트 장치치료</div>
                                <p class="mt-20">턱관절 스플린트 치료는 개인 치아 구조에 맞춘 구강장치를 착용하여 턱관절과<br>주변 근육의 부담을 줄이는 치료입니다.<br>주로 수면 중 착용하며, 이갈이·이악물기 등의 구강 악습관 완화와 턱관절 안정화에 도움을 줄 수 있습니다.<br>턱관절 통증, 턱 소리, 턱 피로감 개선을 위해 상태에 맞춰 치료를 진행합니다.</p>
                            </div>
                            
                            <!-- TAB 3: 주사치료 -->
                            <div id="tmj-t-3" class="tab-pane">
                                <div class="tmj-tab-hero"></div>
                                <div class="tmj-tab-badge mt-40">턱관절 주사치료</div>
                                <p class="mt-20">턱관절 질환은 원인과 증상이 매우 다양하기 때문에 환자 상태에 맞는<br>적절한 주사치료가 중요합니다. 통증 부위, 염증 정도, 근육 긴장 상태 등을 정확히 진단한 후<br>치료를 진행하며, 증상 완화와 기능 회복에 도움을 줄 수 있습니다.</p>
                                
                                <div class="tmj-inj-list mt-50">
                                    <div class="tmj-inj-item">
                                        <div class="inj-title">스테로이드 주사</div>
                                        <div class="inj-desc">반복적으로 주사하면 부작용이 발생할 수 있기 때문에 정확한 진단이 이루어진 후<br>전문의 판단에 따라 1~2회 주사가 시행됩니다.</div>
                                    </div>
                                    <div class="tmj-inj-item">
                                        <div class="inj-title">히알루론산 주사</div>
                                        <div class="inj-desc">관절액 성분과 동일한 약물로서 반복적으로 투여해도 부작용이 거의 없으며<br>통증 완화, 관절액 보충 등을 통해 퇴행된 기능을 정상화시킬 수 있는 좋은 약물입니다.</div>
                                    </div>
                                    <div class="tmj-inj-item">
                                        <div class="inj-title">보툴리눔독소 주사</div>
                                        <div class="inj-desc">일반인들에게 "보톡스"로 알려져 있는 약물입니다. 근육이완 및 통증 완화 효과가 매우 좋습니다.<br>따라서 이갈이, 이악물기와 같은 구강악습관 교정용으로 많이 사용되며 부작용으로 사각턱을 완화시키는 미용 효과를 얻을 수도 있습니다. 주사 비용은 비급여입니다.</div>
                                    </div>
                                    <div class="tmj-inj-item">
                                        <div class="inj-title">PDRN DNA 주사</div>
                                        <div class="inj-desc">상처치유를 촉진시키고, 혈관 및 조직 재생, 소실된 인대의 재생, 염증을 완화시키는 우수한 효과를 발휘합니다.<br>적절한 종류를 선택하여 주사할 경우 퇴행성질환 치료에 도움이 됩니다. 주사 비용은 비급여입니다.</div>
                                    </div>
                                    <div class="tmj-inj-item">
                                        <div class="inj-title">턱관절 봉침치료</div>
                                        <div class="inj-desc">포도당, 리도카인 마취제, 주사용 식염수를 적정 비율로 혼합하여 퇴행성질환 부위 인대, 건, 근막 부위에 주사함으로써<br>손상 받은 조직을 재생시키는 매우 유용한 치료입니다. 신의료기술 등재된 시술로서 비급여입니다.</div>
                                    </div>
                                    <div class="tmj-inj-item">
                                        <div class="inj-title">턱관절세정술</div>
                                        <div class="inj-desc">턱관절 내부 공간에 바늘을 2개 삽입하여 하트만용액이나 생리식염수를 세척하여 관절강 내부의 염증 물질들을 제거하는 치료입니다.<br>심한 염증으로 인해 턱관절 통증이 심하거나 입이 잘 안 벌어지는 환자들에게 매우 효과적인 치료법입니다.</div>
                                    </div>
                                </div>
                            </div>`;

if (!html.includes('<!-- TAB 2: 스플린트 -->')) {
  // Find the end of Tab 1. There are multiple instances of this string, so we target the one inside tab-contents.
  // Actually, we can use a more precise regex.
  html = html.replace(/<div id="tmj-t-1" class="tab-pane active">[\s\S]*?<\/div>/, match => {
    return match + '\n' + newTabs.replace('</p>\n                            </div>\n                            \n                            <!-- TAB 2: 스플린트 -->', '<!-- TAB 2: 스플린트 -->');
  });
  fs.writeFileSync('index.html', html);
  console.log('HTML updated');
} else {
  console.log('Tabs already exist');
}
