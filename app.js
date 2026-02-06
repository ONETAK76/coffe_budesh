const tg = window.Telegram.WebApp;
tg.expand();

const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('user_id') || '000000';

document.getElementById('uid-label').innerText = userId;

// Функция отрисовки QR
function renderQR() {
    const el = document.getElementById("qrcode");
    if (typeof QRCode !== 'undefined') {
        el.innerHTML = "";
        new QRCode(el, {
            text: userId,
            width: 160,
            height: 160
        });
    } else {
        setTimeout(renderQR, 500); // Пробуем еще раз через 0.5 сек
    }
}

window.onload = renderQR;

const grid = document.getElementById('grid');
if (typeof PRODUCTS !== 'undefined') {
    PRODUCTS.forEach(p => {
        grid.innerHTML += `<div class="item">
            <img src="${p.img}">
            <div class="p-10"><b>${p.name}</b><br>${p.price} ₽</div>
        </div>`;
    });
}
tg.ready();





