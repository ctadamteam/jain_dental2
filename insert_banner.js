const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const targetStr = '                </div> <!-- bg-light -->\n            </div> <!-- container mt-100 -->\n        </section>';
const newBanner = `                </div> <!-- bg-light -->
            </div> <!-- container mt-100 -->

            <!-- 하단 상담 배너 -->
            <div class="tmj-consult-banner" style="position: relative; width: 100%; background: url('image/jain_section8_6.png') no-repeat center/cover; margin-top: 80px;">
                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(11, 37, 89, 0.85); z-index: 1;"></div>
                <div class="container" style="position: relative; z-index: 2; padding: 80px 20px; display: flex; justify-content: flex-start;">
                    <div style="width: 100%; max-width: 450px; margin-left: 5%;">
                        <h3 style="color: #fff; font-size: 34px; font-weight: 700; line-height: 1.4; margin-bottom: 30px; text-align: left; letter-spacing: -0.5px;">
                            턱 불편함이 계속된다면<br>지금 상담하세요
                        </h3>
                        <div style="display: flex; flex-direction: column; gap: 12px; width: 100%; max-width: 320px;">
                            <a href="#" style="display: block; width: 100%; text-align: center; background: #ffffff; color: #0b2559; font-size: 22px; font-weight: 800; padding: 18px 0; border-radius: 4px; text-decoration: none;">
                                턱관절 상담 예약
                            </a>
                            <a href="tel:063-715-2875" style="display: block; width: 100%; text-align: center; background: #C69D5D; color: #ffffff; font-size: 22px; font-weight: 800; padding: 18px 0; border-radius: 4px; text-decoration: none;">
                                전화 상담 문의
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>`;

if (html.includes(targetStr)) {
    html = html.replace(targetStr, newBanner);
    fs.writeFileSync('index.html', html, 'utf8');
    console.log('Successfully inserted TMJ consult banner!');
} else {
    console.log('Could not find target string in index.html');
}
