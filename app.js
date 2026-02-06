const tg = window.Telegram.WebApp;
tg.expand();
tg.ready();

const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('user_id') || '000000';

document.getElementById('uid-label').innerText = userId;

// Генерация QR-кода
window.onload = () => {
    const qrcodeContainer = document.getElementById("qrcode");
    qrcodeContainer.innerHTML = ""; // Очистка
    new QRCode(qrcodeContainer, {
        text: userId,
        width: 160,
        height: 160,
        colorDark : "#2c1e12",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });
};

// Рендер товаров
const grid = document.getElementById('grid');
if (typeof PRODUCTS !== 'undefined') {
    PRODUCTS.forEach(p => {
        const item = document.createElement('div');
        item.className = 'product-item';
        item.innerHTML = `
            <div class="image-wrapper">
                <img src="${p.img}" alt="${p.name}">
            </div>
            <div class="product-details">
                <h4>${p.name}</h4>
                <div class="price-tag">${p.price} ₽</div>
            </div>
        `;
        grid.appendChild(item);
    });
}

function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(s => s.style.display = 'none');
    document.getElementById(tabId + '-section').style.display = 'block';
    
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    event.currentTarget.classList.add('active');
}


