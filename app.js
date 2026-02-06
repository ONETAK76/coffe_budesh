const tg = window.Telegram.WebApp;
tg.expand(); // Растянуть на весь экран

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('user_id') || '000000';
    
    document.getElementById('user-id').innerText = userId;

    // Генерируем QR-код
    new QRCode(document.getElementById("qrcode"), {
        text: userId,
        width: 150,
        height: 150,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });

    // Отрисовываем меню
    const productsList = document.getElementById('products-list');
    PRODUCTS.forEach(item => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${item.image}">
            <div class="product-info">
                <h3>${item.name}</h3>
                <p>${item.desc}</p>
                <div class="price">${item.price} ₽</div>
            </div>
        `;
        productsList.appendChild(card);
    });
});

function showTab(tab) {
    document.querySelectorAll('.tab-content').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(tab + '-section').style.display = 'block';
    event.currentTarget.classList.add('active');
}
