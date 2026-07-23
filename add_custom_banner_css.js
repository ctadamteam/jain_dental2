const fs = require('fs');
let css = fs.readFileSync('css/style.css', 'utf8');

const bannerCSS = `
/* Custom HTML Floating Banner */
.custom-floating-banner {
    position: fixed;
    right: 50px;
    top: 50%;
    transform: translateY(-50%);
    width: 90px;
    background: #fff;
    border-radius: 45px 45px 10px 10px;
    box-shadow: 0 5px 20px rgba(0,0,0,0.1);
    z-index: 9999;
    overflow: hidden;
}

.floating-menu {
    list-style: none;
    padding: 0;
    margin: 0;
}

.floating-menu li {
    border-bottom: 1px solid #eee;
}

.floating-menu li:last-child {
    border-bottom: none;
}

.floating-menu a {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 5px;
    text-decoration: none;
    color: #333;
    transition: background 0.2s;
}

.floating-menu a:hover {
    background: #f9f9f9;
}

.icon-placeholder {
    width: 45px;
    height: 45px;
    background-color: #ddd;
    border-radius: 50%;
    margin-bottom: 10px;
}

.floating-menu span {
    font-size: 13px;
    font-weight: 500;
    text-align: center;
    word-break: keep-all;
    line-height: 1.2;
}

.floating-top {
    display: block;
    background: #1c2b59;
    color: #fff;
    text-align: center;
    padding: 15px 0;
    font-size: 14px;
    font-weight: 700;
    text-decoration: none;
}
.floating-top:hover {
    background: #111b3d;
    color: #fff;
}

@media (max-width: 768px) {
    .custom-floating-banner {
        display: none; /* Hide on mobile */
    }
}
`;

if (!css.includes('.custom-floating-banner')) {
    fs.appendFileSync('css/style.css', bannerCSS, 'utf8');
    console.log('Custom floating banner CSS appended.');
} else {
    console.log('Custom floating banner CSS already exists.');
}
