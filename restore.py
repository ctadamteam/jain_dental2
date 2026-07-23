import os

html_file = 'index.html'
with open(html_file, 'r', encoding='utf8') as f:
    content = f.read()

target = '                    </div>\n                        <div class="symp-item"><div class="num-badge">5</div> 두통이나 안면통증이 있다.</div>'

replacement = '''                    </div>
                </div>
            </div>

            <div class="container mt-80">
                <div class="tmj-info-section text-center">
                    <h4>턱관절 질환, 왜 <span class="text-blue">발생</span>할까요?</h4>
                    <p>현대인의 급증하는 스트레스로 인해 다양한 턱관절질환이 많이 발생하고 있습니다.<br>대부분 턱관절에 무리한 힘이 가해지는 것이 턱관절 질환을 유발하는 주 원인입니다.<br>무리한 힘을 발생시키는 요인들은 외상, 치아상실로 인해 음식 씹는 기능의 장애,<br>이갈이·이악물기 같은 나쁜 습관, 부정교합, 정신적 스트레스 등 매우 다양합니다.<br><strong>원인을 찾아서 정확히 진단하고 환자 개별별 맞춤형 치료를 시행하는 것이 매우 중요합니다.</strong></p>
                </div>

                <div class="tmj-cause-icons mt-50">
                    <div class="tc-icon-item">
                        <div class="tc-img" style="display: flex; justify-content: center; align-items: center;"><img src="image/jain_section8_2_1.png" alt="외상" style="width: 80%; height: 80%; object-fit: contain;"></div>
                        <div class="tc-title">외상</div>
                    </div>
                    <div class="tc-icon-item">
                        <div class="tc-img" style="display: flex; justify-content: center; align-items: center;"><img src="image/jain_section8_2_2.png" alt="치아상실" style="width: 80%; height: 80%; object-fit: contain;"></div>
                        <div class="tc-title">치아상실·저작기능장애</div>
                    </div>
                    <div class="tc-icon-item">
                        <div class="tc-img" style="display: flex; justify-content: center; align-items: center;"><img src="image/jain_section8_2_3.png" alt="이갈이" style="width: 80%; height: 80%; object-fit: contain;"></div>
                        <div class="tc-title">이갈이·이악물기</div>
                    </div>
                    <div class="tc-icon-item">
                        <div class="tc-img" style="display: flex; justify-content: center; align-items: center;"><img src="image/jain_section8_2_4.png" alt="부정교합" style="width: 80%; height: 80%; object-fit: contain;"></div>
                        <div class="tc-title">부정교합</div>
                    </div>
                    <div class="tc-icon-item">
                        <div class="tc-img" style="display: flex; justify-content: center; align-items: center;"><img src="image/jain_section8_2_5.png" alt="정신적 스트레스" style="width: 80%; height: 80%; object-fit: contain;"></div>
                        <div class="tc-title">정신적 스트레스</div>
                    </div>
                </div>

                <div class="tmj-info-section text-center mt-80">
                    <h4>이런 <span class="text-blue">증상</span> 있으신가요?</h4>
                    <div class="tmj-symp-grid mt-40">
                        <div class="symp-item"><div class="num-badge">1</div> 입 벌릴 때 딱딱 소리가 난다.</div>
                        <div class="symp-item"><div class="num-badge">2</div> 턱이 자주 뻐근하다.</div>
                        <div class="symp-item"><div class="num-badge">3</div> 입이 잘 벌어지지 않는다.</div>
                        <div class="symp-item"><div class="num-badge">4</div> 턱이 자주 피곤하다.</div>
                        <div class="symp-item"><div class="num-badge">5</div> 두통이나 안면통증이 있다.</div>'''

if target in content:
    content = content.replace(target, replacement)
    with open(html_file, 'w', encoding='utf8') as f:
        f.write(content)
    print("Restore successful.")
else:
    print("Target string not found!")
