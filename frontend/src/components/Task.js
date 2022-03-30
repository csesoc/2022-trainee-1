import React, { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import styled from "styled-components";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import FlutterDashIcon from "@mui/icons-material/FlutterDash";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Button from "react-bootstrap/Button";
import DateTimePicker from "@mui/lab/DateTimePicker";
import TextField from "@mui/material/TextField";
import AddSubtask from "./AddSubtask";
import Tasks from "./Tasks";
import LinearProgress from "@mui/material/LinearProgress";
import './Task.css'

export const TaskContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  margin: 30px auto;
  padding: 20px;
  cursor: pointer;
  width: 50%;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(162, 210, 255, 0.5);
`;

// display: flex;
// padding: 0px 20px;
// align-items: center;
// height: 120px;
// width: 600px;
// margin: 30px 60px;
// background-color: coral;
// border-radius: 5px;
// position: relative;
// export const CrossFlexBox = styled.div`
//     margin-left = 30 px;
// `

const Task = ({ task, onDelete, onEdit, onAddSubtask }) => {
  const [addingSubtask, setAddingSubtask] = useState(false);

  const [isEditing, setEditing] = useState(false);

  const [title, setTitle] = useState(task.text);
  const [editTitle, setEditTitle] = useState(task.text);

  const [description, setDescription] = useState(task.description);
  const [editDescription, setEditDescription] = useState(task.description);

  const [dueDate, setDueDate] = useState(task.dueDate);
  const [editDueDate, setEditDueDate] = useState(task.dueDate);

  function handleTitleChange(e) {
    setEditTitle(e.target.value);
  }

  function handleDescChange(e) {
    setEditDescription(e.target.value);
  }

  function handleEditSubmit(e) {
    e.preventDefault();
    setTitle(editTitle);
    setDescription(editDescription);
    setDueDate(editDueDate);
    onEdit(task.id, editTitle, editDescription, editDueDate);
    setEditing(false);
  }

  const customDatePicker = React.forwardRef((props, ref) => {
    return (
      <DateTimePicker
        label="Task Date"
        // inputFormat="DD-MM-YYYY"
        value={dueDate}
        onChange={(newDate) => {
          setDueDate(newDate);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    );
  });

  // const onAddSubtask = (subtask) => {

  //     console.log(typeof subtask)
  //     setSubtasks([...task.subtasks, subtask]);
  //     //console.log(subtasks)
  //     console.log(`hello + ${subtasks.length}`)
  // }

  // const editTask = (id, newText) => {
  //     const editedTaskList = tasks.map(task => {
  //       // if this task has the same ID as the edited task
  //         if (id === task.id) {
  //           return {...task, text: newText}
  //         }
  //         return task;
  //     });

  //     setTasks(editedTaskList);
  //   }

  const onChecked = (t, index) => {
    const newSubtasks = task.subtasks;
    const status = t.get("complete");
    t.set("complete", !status);
    newSubtasks[index] = t;
    onAddSubtask(task.id, newSubtasks);
  };

  const displaySubtasks = () => {
    //console.log(task.subtasks[0].get("complete"))
    return (
      <>
        {task.subtasks &&
          task.subtasks.map((t, index) => (
            <div>
              <input
                onClick={() => onChecked(t, index)}
                type="checkbox"
              ></input>{" "}
              {!t.get("complete") ? t.get("task") : <del>{t.get("task")}</del>}
            </div>
          ))}
      </>
    );
  };

  const viewTemplate = (
    <TaskContainer>
        <div className="title-container">
            {/* TODO: TEMP FIX FOR CENTERING THE TITLE */}
            <div className="icon-container">
                {/* Showing subtasks - Running Man */}
                <DirectionsRunIcon
                    className="icon"
                    style={{ cursor: "pointer", opacity: "0"}}
                    onClick={() => setAddingSubtask(!addingSubtask)}
                />        
                {/* PENCIL */}
                <ModeEditIcon
                    className="icon"
                    style={{ cursor: "pointer", opacity: "0"}}
                    onClick={() => setEditing(!isEditing)}
                />
                {/* DELETING THE TASK - OWL */}
                <FlutterDashIcon
                    className="icon"
                    style={{ cursor: "pointer", opacity: "0"}}
                    onClick={() => onDelete(task.id)}
                    />             
            </div>
            <p className="title">{task.text}</p>
            <div className="icon-container">   
                {/* Showing subtasks - Running Man */}
                <DirectionsRunIcon
                    className="icon"
                    style={{ cursor: "pointer" }}
                    onClick={() => setAddingSubtask(!addingSubtask)}
                />        
                {/* PENCIL */}
                <ModeEditIcon
                    className="icon"
                    style={{ cursor: "pointer" }}
                    onClick={() => setEditing(!isEditing)}
                />
                {/* DELETING THE TASK - OWL */}
                <FlutterDashIcon
                    className="icon"
                    style={{ cursor: "pointer" }}
                    onClick={() => onDelete(task.id)}
                    />
            </div>
        </div>
      {/* Progress bar that fails to show :(()) */}
      {/* <LinearProgress className="item" variant="determinate" value="10" /> */}
      <p className="Item">{task.description}</p>
      <div className="calendar-container">
        <FaCalendarAlt style={{ marginBottom: "5px", marginRight: "5px" }} />
        {task.dueDate.toLocaleString("en-us", {
          weekday: "long",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        })}
      </div>
      {addingSubtask ? (
        <AddSubtask
          className="Item"
          task={task}
          onAddSubtask={onAddSubtask}
          closeForm={() => setAddingSubtask(!addingSubtask)}
        >
          {" "}
        </AddSubtask>
      ) : (
        <></>
      )}
      <div className="subtasks">{displaySubtasks()}</div>
    </TaskContainer>
  );

  const progress = () => {
    const completed = task.subtasks.filter((t) => t.get("complete")).length;
    console.log("hello");
    return completed / task.subtasks.length;
  };

  const editingTemplate = (
    <TaskContainer>
        <form className="form-container" onSubmit={handleEditSubmit}>
            <div className="title-container">
                <p className="Item">{task.text}</p>
                <div className="icon-container">   
                    {/* Showing subtasks - Running Man */}
                    <DirectionsRunIcon
                        className="icon"
                        style={{ cursor: "pointer" }}
                        onClick={() => setAddingSubtask(!addingSubtask)}
                    />        
                    {/* PENCIL */}
                    <button type="submit">
                        <ModeEditIcon
                            className="icon"
                            style={{ cursor: "pointer" }}
                        />
                    </button>
                    {/* DELETING THE TASK - OWL */}
                    <FlutterDashIcon
                        className="icon"
                        style={{ cursor: "pointer" }}
                        onClick={() => onDelete(task.id)}
                        />
                </div>
            </div>
            <div className="form-group Item">
            {/* <input className='Item' value={editingTextValue} onChange={onTextChange} onKeyDown={onKeyDown} onBlur={onTextBlur}/> */}
            <input
                className="task-text"
                value={editTitle}
                type="text"
                onChange={handleTitleChange}
                />
            </div>
            <div className="form-group Item">
            {/* <input className='Item' value={editingTextValue} onChange={onTextChange} onKeyDown={onKeyDown} onBlur={onTextBlur}/> */}
            <input
                className="task-text"
                value={editDescription}
                type="text"
                onChange={handleDescChange}
                />
            </div>
            {/* <div as={customDatePicker} value={editDueDate} onChange={(e) => setEditDueDate(e.target.value)} style={{width: "75%", maxWidth: "1000px", margin: "auto"}}/> */}
            <p className="Item">{task.description}</p>
            <div className="calendar-container">
                <FaCalendarAlt style={{ marginBottom: "5px", marginRight: "5px" }} />
                {task.dueDate.toLocaleString("en-us", {
                weekday: "long",
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                })}
            </div>
            {addingSubtask ? (
            <AddSubtask
                className="Item"
                task={task}
                onAddSubtask={onAddSubtask}
                closeForm={() => setAddingSubtask(!addingSubtask)}
            >
                {" "}
            </AddSubtask>
            ) : (
            <></>
            )}
            <p>{displaySubtasks()}</p>
        </form>
    </TaskContainer>
  );

  return (
    <div className="todo">{isEditing ? editingTemplate : viewTemplate}</div>
  );
};

export default Task;
