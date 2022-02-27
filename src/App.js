import React, { useState } from 'react'
import AddTask from './components/AddTask';
import './App.css';
import Button from 'react-bootstrap/Button';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import frLocale from 'date-fns/locale/fr';

function App() {
  const [tasks, setTasks] = useState([]);
  
  const addTask = (task) => {
    setTasks([...tasks, task])
  }
  
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={frLocale}>
      <div className="App">
        <AddTask onAdd={addTask} />
        <div>
          <>
          {tasks.length > 0 ? tasks.map((task) => 
            <>
              <p>{task.text}</p>
              <p>{task.description}</p>
              <p>{task.dueDate.toLocaleString()}</p>
            </>   
          ) : "No tasks to show"}
          </>
          <>

          </>
        </div>
      </div>
    </LocalizationProvider>
  );
}

export default App;
