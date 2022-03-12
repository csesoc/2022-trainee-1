import React, { useState } from 'react'
import Header from './components/Header';
import AddTask from './components/AddTask';
import Task from './components/Task';
import Tasks from './components/Tasks';
import TodaysTasks from './components/TodaysTasks';
import './App.css';
import Button from 'react-bootstrap/Button';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import frLocale from 'date-fns/locale/fr';


function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    // import { nanoid } from 'nanoid'
    // test.id = nanoid()
    const id = Math.floor(Math.random() * 10000) + 1
    const newTask = {id, ...task}
    setTasks([...tasks, newTask])
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="App">
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
        {showAddTask && <AddTask onAdd={addTask}/>}
        
        <h1>Today's Tasks</h1>
        <div>
          <>
            {tasks.length > 0 ? <TodaysTasks tasks={tasks} onDelete={deleteTask}/> : "No tasks to show"}
          </>
        </div>
        <h1>Tasks</h1>
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
