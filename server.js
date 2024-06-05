const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = 3000;

// Налаштування CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Дозволяємо доступ з будь-якого джерела
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Дозволяємо різні методи запитів
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Дозволяємо вказувати заголовки
    next();
});

// Обробник для проксі-запитів
app.get('/proxy', async (req, res) => {
    const url = req.query.url; // Отримуємо URL, до якого потрібно зробити запит

    try {
        const response = await fetch(url); // Робимо запит до віддаленого сервера
        const data = await response.json(); // Отримуємо дані з відповіді
        res.json(data); // Повертаємо дані клієнту
    } catch (error) {
        console.error('Помилка при роботі з віддаленим сервером:', error);
        res.status(500).send('Помилка при обробці запиту');
    }
});

// Сервер слухає вказаний порт
app.listen(port, () => {
    console.log(`Проксі-сервер запущено на порті ${port}`);
});
