const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(`                    </div>
                </div>
                    </div>
                </div>

                <!-- TAB 4: 주사치료 -->`, `                    </div>
                </div>
            </div>

            <!-- TAB 4: 주사치료 -->`);

fs.writeFileSync('index.html', html, 'utf8');

console.log('Cleaned extra closing div in con-3 SUCCESS!');
