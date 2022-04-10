import React, { useState, useEffect } from 'react'
import Header from './components/Header';
import AddTask from './components/AddTask';
//import Task from './components/Task';
import Tasks from './components/Tasks';
import TodaysTasks from './components/TodaysTasks';
import {removeEvent, editEvent} from "./components/GoogleCalendar"
import './App.css';
//import Button from 'react-bootstrap/Button';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';


const default_color = "#00000"
const highlight_color = "#eee3e0"


function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [currentPage, setPage] = useState("Home")
  const [toggle, setToggle] = useState("hidden");

  const handleNavClick = () => {
    setToggle(toggle === "open" ? "hidden" : "open")
  }

  const handlePageClick = (page) => {
    if (allTags.includes(page) || page === "Home") {
      setPage(page)
    } else {
      console.log("%s not valid page", page)
    }
  }

  useEffect(() => {
    fetch("http://localhost:8000/tasks", {
      method: "GET",
    }).then(response => {
      return response.json();
    }).then(jsonData => {
      setTasks(jsonData);
      console.log(jsonData);
      console.log("fetched from backend");
    });
  }, []);
  // this returns all tasks which are in current page category

  const getTasks = () => {
    if (currentPage === "Home") {
      return tasks
    } else {
      return tasks.filter((t) => {
        return t.tags.includes(currentPage)
      })
    }
  }

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
      newTask._id = jsonData.newId;
      setTasks([...tasks, newTask]);
    });

  }

  const deleteTask = (id) => {

    let removedTask;
    let newTasks = tasks.filter((task) => {
      if (task._id === id) {
        removedTask = task
        if (task.addToCalendar) {
          // removed from calendar if applicable
          removeEvent(task.text)
        }
      }
      return task._id !== id
    })
    setTasks(newTasks)

    //check if categories still exist
    let newTags = allTags
    for (const tag of removedTask.tags) {
      let temp = newTasks.filter((t) => t.tags.includes(tag))
      //console.log("Yeet:", tag, temp)
      if (temp.length === 0) {
        //we remove category
        newTags = newTags.filter((t) => t !== tag)
        if (currentPage === tag) {
          setPage("Home")
        }
      }
    }
    setAllTags(newTags)


    fetch("http://localhost:8000/tasks", {
      method: "DELETE",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({"idToDelete" : id})
    });
    console.log(id);
  }

  // should this be using ._id??
  const editTask = (id, newTitle, newDesc, newDueDate) => {
    const editedTaskList = tasks.map(task => {
      // if this task has the same ID as the edited task
        if (id === task.id) {
          if (task.addToCalendar) {
            //we edit in google calendar
            editEvent(task.text, {
              summary: newTitle,
              description: newDesc,
              //newDueDate??
            })
          }

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




    <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
          <a href="/#" 
          // I cannot figure out why this isn't working -> state IS updating
          // style={{"backgroundColor": currentPage === "Home" ? highlight_color : default_color}}
          
            onClick={(e) => 
            {e.preventDefault(); handlePageClick("Home")}}>Home</a>
          { //this renders every category inside the sidebar
            allTags.map((tag) => 
              <a key={tag.concat("Page")} href="/#" 
              //style={{"backgroundColor": currentPage === tag ? highlight_color : default_color}}
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

        {
          currentPage === "Home" ?
          <h1>All Tasks</h1> :
          <h1>Tasks</h1>
        }
        
        
        <div>
          <>
            {tasks.length > 0 ? <Tasks tasks={getTasks()} onDelete={deleteTask} onEdit={editTask} onAddSubtask={addSubtask}/> : "No tasks to show"}
          </>
        </div>
      </div>
      </MuiPickersUtilsProvider>
  );
}

export default App;
