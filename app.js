const tg = window.Telegram.WebApp;
tg.expand();
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('user_id') || '000000';
document.getElementById('uid-label').innerText = userId;

window.addEventListener('load', () => {
    setTimeout(() => {
        const qrBox = document.getElementById("qrcode");
        qrBox.innerHTML = "";
        new QRCode(qrBox, {
            text: userId,
            width: 160,
            height: 160,
            colorDark : "#2c1e12",
            colorLight : "#ffffff"
        });
    }, 500);
});

const grid = document.getElementById('grid');
if (typeof PRODUCTS !== 'undefined') {
    PRODUCTS.forEach(p => {
        grid.innerHTML += `<div class="item">
            <img src="${p.img}">
            <div class="p-10"><b>${p.name}</b><br><span style="color:#d4a373">${p.price} ₽</span></div>
        </div>`;
    });
}
tg.ready();




