const express = require('express');
const knex = require('./database'); // Подключение базы данных
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());





// Получить все задачи
app.get('/tasks', async (req, res) => {
  const tasks = await knex('tasks').select('*');
  res.json(tasks);
});

// Добавить новую задачу
app.post('/tasks', async (req, res) => {
  const { title, deadline } = req.body;
  const task = await knex('tasks').insert({ title, deadline, completed: false });
  res.status(201).json({ success: true });
});

// Обновить задачу
app.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  await knex('tasks').where({ id }).update({ completed });
  res.json({ success: true });
});

// Удалить задачу
app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  await knex('tasks').where({ id }).del();
  res.json({ success: true });
});

app.listen(5000, () => console.log('Сервер запущен на http://localhost:5000'));