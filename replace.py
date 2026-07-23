import re

html_content = """                    <div class="tab-contents">
                        <!-- TAB 1: 즉시 임플란트 -->
                        <div id="implant-1" class="tab-pane active">
                            <div class="implant-tab-hero"></div>
                            
                            <h4 class="implant-tab-title">즉시 임플란트란?</h4>
                            <p class="implant-tab-desc">발치와 임플란트 식립을 한 번에 진행 할 수 있어 치료 기간과<br>여러 번 내원해야 하는 부담을 줄이는 데 도움이 됩니다.</p>
                            
                            <h4 class="implant-tab-title mt-60">즉시 임플란트 <span class="text-blue">치료 대상</span></h4>
                            <p class="implant-tab-desc">즉시 임플란트는 잇몸뼈 상태와 치아 조건에 따라 진행 가능 여부가<br>달라질 수 있어, 충분한 정밀 진단 후 계획하는 것이 중요합니다.</p>
                            
                            <div class="implant-target-box">
                                <ul>
                                    <li><span class="num">1</span> 발치 후 빠른 임플란트 진행을 원하는 경우</li>
                                    <li><span class="num">2</span> 잇몸뼈 상태가 비교적 안정적인 경우</li>
                                    <li><span class="num">3</span> 치아 손상이나 흔들림으로 발치가 필요한 경우</li>
                                    <li><span class="num">4</span> 치아 공백 기간을 줄이고 싶은 경우</li>
                                </ul>
                            </div>
                            
                            <h4 class="implant-tab-title mt-60">즉시 임플란트의 <span class="text-blue">장점</span></h4>
                            <ul class="implant-pros">
                                <li>
                                    <div class="pro-title"><span class="num">1</span> 치료기간 단축</div>
                                    <div class="pro-desc">발치와 임플란트 식립을 한 번에 진행할 수 있어 전체 치료 기간 부담을 줄일 수 있습니다.</div>
                                </li>
                                <li>
                                    <div class="pro-title"><span class="num">2</span> 내원 횟수 감소</div>
                                    <div class="pro-desc">치료 과정을 줄여 여러 번 병원을 방문해야 하는 부담을 덜 수 있습니다.</div>
                                </li>
                                <li>
                                    <div class="pro-title"><span class="num">3</span> 치아 공백 기간 최소화</div>
                                    <div class="pro-desc">발치 후 빈 공간으로 인한 불편함을 줄이는 데 도움이 될 수 있습니다.</div>
                                </li>
                            </ul>
                            
                            <div class="implant-process-section mt-80">
                                <div class="container">
                                    <h4 class="implant-tab-title">즉시 임플란트 <span class="text-blue">치료 과정</span></h4>
                                    <div class="process-grid">
                                        <div class="process-item">
                                            <div class="process-img" style="background-image: url('./image/jain_section4_1.png'); background-size: cover; background-position: center;"></div>
                                            <div class="process-step">정밀 진단 및 검사</div>
                                            <p>구강 상태와 잇몸뼈를<br>확인하여 즉시 임플란트 가능<br>여부를 진단합니다.</p>
                                        </div>
                                        <div class="process-item">
                                            <div class="process-img" style="background-image: url('./image/jain_section4_2.png'); background-size: cover; background-position: center;"></div>
                                            <div class="process-step bg-gold">손상 치아 발치</div>
                                            <p>문제가 있는 치아를<br>꼼꼼하게 발치하며 잇몸 상태를<br>함께 확인합니다.</p>
                                        </div>
                                        <div class="process-item">
                                            <div class="process-img" style="background-image: url('./image/jain_section4_3.png'); background-size: cover; background-position: center;"></div>
                                            <div class="process-step">즉시 임플란트 식립</div>
                                            <p>발치 후 가능한 경우<br>바로 임플란트를 식립하여<br>치료를 진행합니다.</p>
                                        </div>
                                        <div class="process-item">
                                            <div class="process-img" style="background-image: url('./image/jain_section4_4.png'); background-size: cover; background-position: center;"></div>
                                            <div class="process-step bg-gold">회복 및 보철 치료</div>
                                            <p>임플란트가 안정적으로 자리<br>잡을 수 있도록 회복 과정을<br>거친 뒤 보철 치료를 진행해<br>마무리합니다.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- TAB 2: 3D분석 임플란트 -->
                        <div id="implant-2" class="tab-pane">
                            <div class="implant-tab-hero"></div>
                            
                            <h4 class="implant-tab-title">3D 컴퓨터 분석 임플란트란?</h4>
                            <p class="implant-tab-desc">3D CT 촬영과 컴퓨터 분석을 통해 잇몸뼈, 신경 위치 등을 확인한 뒤<br>보다 정밀하게 계획하여 진행하는 임플란트 치료입니다.</p>
                            
                            <h4 class="implant-tab-title mt-60">3D 컴퓨터 분석 임플란트 <span class="text-blue">치료 대상</span></h4>
                            <p class="implant-tab-desc">즉시 임플란트는 잇몸뼈 상태와 치아 조건에 따라 진행 가능 여부가<br>달라질 수 있어, 충분한 정밀 진단 후 계획하는 것이 중요합니다.</p>
                            
                            <div class="implant-target-box">
                                <ul>
                                    <li><span class="num">1</span> 신경과 가까운 위치에 임플란트 식립이 필요한 경우</li>
                                    <li><span class="num">2</span> 여러 개의 임플란트를 빠르고 안정적으로 식립해야 하는 경우</li>
                                    <li><span class="num">3</span> 잇몸뼈가 좁거나 얇은 부위에 식립이 필요한 경우</li>
                                    <li><span class="num">4</span> 출혈 부담을 줄이고 빠른 식립이 필요한 경우</li>
                                </ul>
                            </div>
                            
                            <h4 class="implant-tab-title mt-60">3D 컴퓨터 분석 임플란트의 <span class="text-blue">장점</span></h4>
                            <ul class="implant-pros">
                                <li>
                                    <div class="pro-title"><span class="num">1</span> 정밀한 치료 계획 가능</div>
                                    <div class="pro-desc">구강 구조를 입체적으로 분석하여 보다 세밀한 계획 수립에 도움이 됩니다.</div>
                                </li>
                                <li>
                                    <div class="pro-title"><span class="num">2</span> 개인별 맞춤 치료 진행</div>
                                    <div class="pro-desc">치아와 잇몸 상태를 고려해 개인별 맞춤 치료 방향을 설정할 수 있습니다.</div>
                                </li>
                                <li>
                                    <div class="pro-title"><span class="num">3</span> 안정적인 식립 도움</div>
                                    <div class="pro-desc">신경 위치와 잇몸뼈 상태를 고려하여 안정적인 식립 계획에 도움이 됩니다.</div>
                                </li>
                                <li>
                                    <div class="pro-title"><span class="num">4</span> 치료 부담 감소 도움</div>
                                    <div class="pro-desc">불필요한 절개 범위를 줄이는 방향으로 계획될 수 있어 회복 부담 감소에 도움이 될 수 있습니다.</div>
                                </li>
                            </ul>
                            
                            <div class="implant-process-section mt-80">
                                <div class="container">
                                    <h4 class="implant-tab-title">3D 컴퓨터 분석 임플란트 <span class="text-blue">치료 과정</span></h4>
                                    <div class="process-grid">
                                        <div class="process-item">
                                            <div class="process-img bg-gray"></div>
                                            <div class="process-step">3D CT 정밀 촬영</div>
                                            <p>구강 구조와 잇몸뼈 상태를<br>입체적으로 확인합니다.</p>
                                        </div>
                                        <div class="process-item">
                                            <div class="process-img bg-gray"></div>
                                            <div class="process-step bg-gold">컴퓨터 분석 및 치료 계획</div>
                                            <p>신경 위치와 식립 방향 등을<br>분석하여 치료 계획을 세웁니다.</p>
                                        </div>
                                        <div class="process-item">
                                            <div class="process-img bg-gray"></div>
                                            <div class="process-step">맞춤형 임플란트 식립</div>
                                            <p>분석 데이터를 바탕으로<br>임플란트를 식립합니다.</p>
                                        </div>
                                        <div class="process-item">
                                            <div class="process-img bg-gray"></div>
                                            <div class="process-step bg-gold">회복 및 보철 치료 진행</div>
                                            <p>안정적인 회복 과정을 거친 뒤<br>보철 치료를 진행합니다.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- TAB 3: 상악동거상술 임플란트 -->
                        <div id="implant-3" class="tab-pane">
                            <div class="implant-tab-hero"></div>
                            
                            <h4 class="implant-tab-title">상악동거상술 임플란트란?</h4>
                            <p class="implant-tab-desc">위쪽 어금니 부위 잇몸뼈가 부족한 경우, 상악동 공간을 확보하고 뼈이식을 함께<br>진행하여 임플란트 식립 기반을 만드는 치료입니다.</p>

                            <h4 class="implant-tab-title mt-60">상악동이란?</h4>
                            <p class="implant-tab-desc">위쪽 어금니 주변 코 옆에 위치한 빈 공간 구조를 말합니다.<br>치아를 오래 상실했거나 잇몸뼈가 얇아진 경우 상악동과의 거리가 가까워져, 임플란트<br>식립 전 충분한 뼈를 확보하는 과정이 필요할 수 있습니다.</p>
                            
                            <h4 class="implant-tab-title mt-60">상악동거상술 임플란트 <span class="text-blue">치료 대상</span></h4>
                            <p class="implant-tab-desc">즉시 임플란트는 잇몸뼈 상태와 치아 조건에 따라 진행 가능 여부가<br>달라질 수 있어, 충분한 정밀 진단 후 계획하는 것이 중요합니다.</p>
                            
                            <div class="implant-target-box">
                                <ul>
                                    <li><span class="num">1</span> 위쪽 어금니 부위 잇몸뼈가 부족한 경우</li>
                                    <li><span class="num">2</span> 잇몸뼈 흡수로 임플란트 식립이 어려운 경우</li>
                                    <li><span class="num">3</span> 오래전 치아를 상실해 뼈가 얇아진 경우</li>
                                    <li><span class="num">4</span> 안정적인 임플란트 식립 기반이 필요한 경우</li>
                                </ul>
                            </div>
                            
                            <h4 class="implant-tab-title mt-60">상악동거상술 임플란트의 <span class="text-blue">장점</span></h4>
                            <ul class="implant-pros">
                                <li>
                                    <div class="pro-title"><span class="num">1</span> 부족한 잇몸뼈 보완가능</div>
                                    <div class="pro-desc">잇몸뼈가 부족한 경우에도 임플란트 식립 가능 범위를 넓히는 데 도움이 됩니다.</div>
                                </li>
                                <li>
                                    <div class="pro-title"><span class="num">2</span> 안정적인 식립 기반 형성</div>
                                    <div class="pro-desc">충분한 뼈를 확보하여 보다 안정적인 임플란트 식립에 도움이 됩니다.</div>
                                </li>
                                <li>
                                    <div class="pro-title"><span class="num">3</span> 개인 상태에 맞춘 치료 가능</div>
                                    <div class="pro-desc">상악동과 잇몸뼈 상태를 고려해 맞춤형 치료 계획이 가능합니다.</div>
                                </li>
                                <li>
                                    <div class="pro-title"><span class="num">4</span> 위쪽 어금니 임플란트 개선 도움</div>
                                    <div class="pro-desc">식립이 어려웠던 위쪽 어금니 부위 치료 방향을 넓히는 데 도움이 될 수 있습니다.</div>
                                </li>
                            </ul>
                            
                            <div class="implant-process-section mt-80">
                                <div class="container">
                                    <h4 class="implant-tab-title">상악동거상술 임플란트 <span class="text-blue">치료 과정</span></h4>
                                    <div class="process-grid">
                                        <div class="process-item">
                                            <div class="process-img bg-gray"></div>
                                            <div class="process-step">정밀 진단 및 CT 촬영</div>
                                            <p>상악동 위치와 잇몸뼈 상태를<br>꼼꼼하게 확인합니다.</p>
                                        </div>
                                        <div class="process-item">
                                            <div class="process-img bg-gray"></div>
                                            <div class="process-step bg-gold">상악동 공간 확보</div>
                                            <p>상악동 막을 조심스럽게 들어 올려<br>식립 공간을 확보합니다.</p>
                                        </div>
                                        <div class="process-item">
                                            <div class="process-img bg-gray"></div>
                                            <div class="process-step">뼈이식 및 임플란트 식립</div>
                                            <p>필요 시 뼈이식을 진행하고<br>임플란트를 식립합니다.</p>
                                        </div>
                                        <div class="process-item">
                                            <div class="process-img bg-gray"></div>
                                            <div class="process-step bg-gold">회복 및 보철 치료 진행</div>
                                            <p>잇몸과 뼈가 안정적으로 회복된 후<br>보철 치료를 진행합니다.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>"""

with open("index.html", "r", encoding="utf-8") as f:
    text = f.read()

# Replace from <div class="tab-contents"> to </section> before 심미치료
import re
pattern = re.compile(r'                    <div class="tab-contents">.*?</div>\s*</div>\s*</div>\s*<div class="implant-process-section mt-80">.*?</div>\s*</section>', re.DOTALL)

replacement = html_content + "\n                </div>\n            </div>\n        </section>"

new_text = pattern.sub(replacement, text)

with open("index.html", "w", encoding="utf-8") as f:
    f.write(new_text)

print("Done replacing.")
