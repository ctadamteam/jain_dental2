const https = require('https');
https.get('https://www.mnmiso-dent.co.kr/', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    // Find all script tags
    const scriptSrcs = data.match(/<script.*?src=["'](.*?)["'].*?>/g) || [];
    console.log('Scripts:', scriptSrcs.filter(s => s.includes('js')));
    
    // Check for swiper initialization in inline scripts
    const inlines = data.match(/<script>([\s\S]*?)<\/script>/g) || [];
    inlines.forEach(script => {
        if(script.toLowerCase().includes('swiper')) {
            console.log('--- INLINE SWIPER SCRIPT ---');
            console.log(script);
        }
    });
  });
}).on('error', (e) => {
  console.error(e);
});
