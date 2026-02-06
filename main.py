import os
import asyncio
from flask import Flask, request, jsonify
from flask_cors import CORS
from aiogram import Bot, Dispatcher, types
from aiogram.filters import Command
from aiogram.types import WebAppInfo, InlineKeyboardMarkup, InlineKeyboardButton
import threading

app = Flask(__name__)
CORS(app)

# --- НАСТРОЙКИ ---
BOT_TOKEN = '8592491073:AAHMGeIOkG5DZlaW8UHpE9TJ3oM7Uk-4jWg'
ADMIN_IDS = [1368428868, 316438597]  # ВАШ ID
GITHUB_URL = 'https://onetak76.github.io/coffe_budesh/' 

users_db = {} 

@app.route('/get_data', methods=['POST'])
def get_data():
    uid = int(request.json.get('user_id', 0))
    if uid not in users_db: users_db[uid] = 0.0
    return jsonify({"balance": users_db[uid], "is_admin": uid in ADMIN_IDS})

@app.route('/transaction', methods=['POST'])
def transaction():
    data = request.json
    admin_id, target_id = int(data['admin_id']), int(data['target_id'])
    amount, action = float(data['amount']), data['action']
    if admin_id not in ADMIN_IDS: return jsonify({"status": "error"}), 403
    if target_id not in users_db: users_db[target_id] = 0.0
    
    if action == 'add':
        bonus = amount * 0.03
        users_db[target_id] += bonus
        msg = f"Начислено {bonus:.2f}"
    else:
        if users_db[target_id] < amount: return jsonify({"status":"error", "message":"Недостаточно баллов"})
        users_db[target_id] -= amount
        msg = f"Списано {amount:.2f}"
    return jsonify({"status": "ok", "message": msg})

bot = Bot(token=BOT_TOKEN)
dp = Dispatcher()

@dp.message(Command("start"))
async def start(message: types.Message):
    markup = InlineKeyboardMarkup(inline_keyboard=[
        [InlineKeyboardButton(text="💳 Открыть карту", web_app=WebAppInfo(url=GITHUB_URL))]
    ])
    await message.answer("Ваша карта лояльности:", reply_markup=markup)

# Функция для запуска бота
async def start_bot():
    await dp.start_polling(bot)

# Точка входа для Render (использует порт из переменной окружения)
if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    threading.Thread(target=lambda: app.run(host='0.0.0.0', port=port), daemon=True).start()
    asyncio.run(start_bot())
