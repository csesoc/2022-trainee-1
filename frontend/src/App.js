import React, { useState } from 'react'
import Header from './components/Header';
import AddTask from './components/AddTask';
//import Task from './components/Task';
import Tasks from './components/Tasks';
import TodaysTasks from './components/TodaysTasks';
import './App.css';
//import Button from 'react-bootstrap/Button';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import frLocale from 'date-fns/locale/fr';


const default_color = "#00000"
const highlight_color = "#eee3e0"


function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [currentPage, setPage] = useState("Home")
  const [toggle, setToggle] = useState("hidden");

  const handleNavClick = () => {
    console.log("click")
    setToggle(toggle === "open" ? "hidden" : "open")
  }

  const handlePageClick = (page) => {
    if (allTags.includes(page) || page === "Home") {
      setPage(page)
    } else {
      console.log("%s not valid page", page)
    }
  }

  // this returns all tasks which are in current page category
  // const getTasks = () => {
  //   if (currentPage === "Home") {
  //     return tasks
  //   } else {
  //     return tasks.filter((t) => {
  //       return t.tags.includes(currentPage)
  //     })
  //   }
  // }

  // on sync issues:

  // !!!!! changes that user makes after clicking add task and before server response will be lost
  
  // useState is async. useEffect couldn't overcome this for me
  // currently setTasks with temp ID, then after the response calls
  // setTasks with real DB generated ID
  
  const addTask = (task) => {
    // import { nanoid } from 'nanoid'
    // test.id = nanoid()
    const id = Math.floor(Math.random() * 10000) + 1
    const newTask = {id, ...task}
    
    // keep tags sorted in some way here????/
    for (const tag of task.tags) {
      //adds tag to list of all tags if doesnt already exist
      if (!allTags.includes(tag)) {
        setAllTags( allTags => [...allTags, tag])
      }
    }

    setTasks([...tasks, newTask]);

    fetch("http://localhost:8000/tasks", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(task)
    }).then(response => {
      return response.json();
    }).then(jsonData => {
      newTask.id = jsonData.newId;
      setTasks([...tasks, newTask]);
    });

  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    fetch("http://localhost:8000/tasks", {
      method: "DELETE",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({"idToDelete" : id})
    });
  }

  const editTask = (id, newTitle, newDesc, newDueDate) => {
    const editedTaskList = tasks.map(task => {
      // if this task has the same ID as the edited task
        if (id === task.id) {
          return {...task, text: newTitle, description: newDesc, dueDate: newDueDate}
        }
        return task;
    });

    setTasks(editedTaskList);
  }

  const addSubtask = (id, newSubtaskArray) => {
    const editedTaskList = tasks.map(task => {
      // if this task has the same ID as the edited task
        if (id === task.id) {
          return {...task, subtasks: newSubtaskArray}
        }
        return task;
    });

    setTasks(editedTaskList)
  }




  return (

    <LocalizationProvider dateAdapter={AdapterDateFns} locale={frLocale}>
      <div className="navbar">
        <span className="openbtn" style={{"font-size": "30px", "cursor": "pointer"}} 
        onClick={handleNavClick}>&#9776;</span>
        <div className="navTitle">
          <h1 style={{"text-align": "center", "color": "#eed1ac"}}> TO BE DONE </h1>
        </div>
      </div>
      <div className="App">
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
        {showAddTask && <AddTask onAdd={addTask}/>}
        <div id={toggle} className="sidenav">
          <a href="/#" className="closebtn" 
          onClick={(e) => {e.preventDefault(); handleNavClick()}}>
            &times;</a>
          <a href="/#" style={{
            "background-color": currentPage === "Home" ? highlight_color : default_color
            }}
          
            onClick={(e) => 
            {e.preventDefault(); handlePageClick("Home")}}>Home</a>
          { //this renders every category inside the sidebar
            allTags.map((tag) => 
              <a key={tag.concat("Page")}href="/#" style={{
                "background-color": currentPage === tag ? highlight_color : default_color}}
                onClick={(e) => {e.preventDefault(); handlePageClick(tag)}}>{tag}</a>
            )
          }
        </div>
        { // we only show Today's Tasks on the Home Page
          currentPage === "Home" ?
          <>
            <h1>Today's Tasks</h1>
            <div>
              <>
                <TodaysTasks tasks={tasks} onDelete={deleteTask}/>
              </>
            </div>
            </>
          : ""
        }
        <h1>Tasks</h1>
        <div>
          <>
            {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onEdit={editTask} onAddSubtask={addSubtask}/> : "No tasks to show"}
          </>
        </div>
      </div>
    </LocalizationProvider>
  );
}

export default App;
