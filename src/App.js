import React, { useState } from 'react'
import AddTask from './components/AddTask';
import Task from './components/Task';
import Tasks from './components/Tasks';
import './App.css';
import Button from 'react-bootstrap/Button';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import frLocale from 'date-fns/locale/fr';

function App() {
  const [tasks, setTasks] = useState([]);
  
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1
    const newTask = {id, ...task}
    setTasks([...tasks, newTask])
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={frLocale}>
      <div className="App">
        <AddTask onAdd={addTask} />
        <div>
          <>
            {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask}/> : "No tasks to show"}
          </>
        </div>
      </div>
    </LocalizationProvider>
  );
}

export default App;
