const knex = require('knex')({
  client: 'sqlite3',
  connection: { filename: './tasks.db' },
  useNullAsDefault: true,
});

// Создание таблицы задач, если она не существует
knex.schema.hasTable('tasks').then((exists) => {
  if (!exists) {
    return knex.schema.createTable('tasks', (table) => {
      table.increments('id');
      table.string('title');
      table.string('deadline');
      table.boolean('completed');
    });
  }
});

module.exports = knex;