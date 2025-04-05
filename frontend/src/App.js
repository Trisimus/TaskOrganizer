import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/tasks').then((response) => {
      setTasks(response.data);
    });
  }, []);

  const addTask = () => {
    axios.post('http://localhost:5000/tasks', { title: newTask, deadline: 'No deadline' }).then(() => {
      setTasks([...tasks, { title: newTask, completed: false }]);
      setNewTask('');
    });
  };

  const deleteTask = (id) => {
    axios.delete(`http://localhost:5000/tasks/${id}`).then(() => {
      setTasks(tasks.filter((task) => task.id !== id));
    });
  };

  return (
    <div>
      <h1>Органайзер задач</h1>
      <input
        type="text"
        placeholder="Новая задача..."
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={addTask}>Добавить</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} <button onClick={() => deleteTask(task.id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;