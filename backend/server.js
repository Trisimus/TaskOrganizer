const express = require('express'); // Подключаем Express
const knex = require('./database'); // Подключаем базу данных
const cors = require('cors'); // Разрешаем запросы с других доменов

const app = express(); // Создаем экземпляр приложения Express

app.use(express.json()); // Поддержка JSON-запросов
app.use(cors()); // Включаем CORS для клиентской части

// Получение всех задач
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await knex('tasks').select('*');
    res.json(tasks);
  } catch (error) {
    console.error('Ошибка получения задач:', error);
    res.status(500).json({ error: 'Не удалось получить задачи' });
  }
});

// Добавление новой задачи
app.post('/tasks', async (req, res) => {
  const { title, deadline } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Название задачи обязательно' });
  }
  try {
    await knex('tasks').insert({ title, deadline, completed: false });
    res.status(201).json({ success: true });
  } catch (error) {
    console.error('Ошибка добавления задачи:', error);
    res.status(500).json({ error: 'Не удалось добавить задачу' });
  }
});

// Обновление задачи
app.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  try {
    const updated = await knex('tasks').where({ id }).update({ completed });
    if (updated) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Задача не найдена' });
    }
  } catch (error) {
    console.error('Ошибка обновления задачи:', error);
    res.status(500).json({ error: 'Не удалось обновить задачу' });
  }
});

// Удаление задачи
app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await knex('tasks').where({ id }).del();
    if (deleted) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Задача не найдена' });
    }
  } catch (error) {
    console.error('Ошибка удаления задачи:', error);
    res.status(500).json({ error: 'Не удалось удалить задачу' });
  }
});

// Настройка порта
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Сервер запущен на порту ${PORT}`));