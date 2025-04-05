const express = require('express'); // Подключение Express
const knex = require('./database'); // Подключение базы данных
const cors = require('cors'); // Подключение CORS
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));

const app = express(); // Создаем приложение Express

app.use(express.json()); // Поддержка JSON-запросов
app.use(cors()); // Включаем CORS для разрешения запросов с других доменов

// Получение всех задач
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await knex('tasks').select('*');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Не удалось получить задачи' });
  }
});

// Добавление новой задачи
app.post('/tasks', async (req, res) => {
  const { title, deadline } = req.body;
  try {
    await knex('tasks').insert({ title, deadline, completed: false });
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Не удалось добавить задачу' });
  }
});

// Обновление задачи
app.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  try {
    await knex('tasks').where({ id }).update({ completed });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Не удалось обновить задачу' });
  }
});

// Удаление задачи
app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await knex('tasks').where({ id }).del();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Не удалось удалить задачу' });
  }
});

// Настройка порта для работы на Render
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));