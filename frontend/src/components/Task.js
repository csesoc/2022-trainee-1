import React, { useState } from 'react'
import { FaCalendarAlt } from 'react-icons/fa'
import styled from 'styled-components';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import FlutterDashIcon from '@mui/icons-material/FlutterDash';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Button from 'react-bootstrap/Button';
import DateTimePicker from '@mui/lab/DateTimePicker'; 
import TextField from '@mui/material/TextField';

export const TaskContainer = styled.div`  
    display: flex;
    flex-wrap: wrap;
    row-gap: 5px;
    background: white;
    margin: 30px auto;
    padding: 20px;
    cursor: pointer;
    width: 50%;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(162, 210, 255, 0.5);
`

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

const Task = ({task, onDelete, onEdit}) => {
    const [showSubTasks, setShowSubTasks] = useState(false)
    
    const [isEditing, setEditing] = useState(false)

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

    function handleSubmit(e) {
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
            renderInput={(params) => <TextField {...params} 
            />}
            /> 
    )});



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



    const viewTemplate = (
        <TaskContainer className='container'>
            <h2> Title </h2>
            
            {/* DELETING THE TASK */}
            <FlutterDashIcon className='icon' style={{cursor: 'pointer'}} onClick={() => onDelete(task.id)} />
            
            <div class='break'></div>

            <ModeEditIcon className='icon' style={{cursor: 'pointer'}} onClick={() => setEditing(!isEditing)} />

            <div class='break'></div>

            {/* TITLE!! */}
            <p className='Item'>{task.text}</p>

            <div class='break'></div>
            
            <p className='Item'>{task.description}</p>
            
            <div class='break'></div>

            <p className='Item'> <FaCalendarAlt style={{marginBottom: "5px", marginRight: "5px"}}/>
                {task.dueDate.toLocaleString('en-us', {weekday:"long", year:"numeric", month:"short", day:"numeric", hour: "numeric", minute: "numeric"})}
            </p>

            <div class='break'></div>

            {/* Showing subtasks */}
            <DirectionsRunIcon className='icon' style={{cursor: 'pointer'}} onClick={() => setShowSubTasks(!showSubTasks)} />

            <div class='break'></div>

            {showSubTasks ? <p className='Item'>{task.subtasks.length > 0 ? task.subtasks : <></>}</p> : <></>}

            {/* Allow for editing tasks */}
            
        </TaskContainer>
    )

    const editingTemplate = (
        <TaskContainer className='container'>
            <form onSubmit={handleSubmit}>
                <h2> Title </h2>
                
                <div className="form-group">
                        {/* <input className='Item' value={editingTextValue} onChange={onTextChange} onKeyDown={onKeyDown} onBlur={onTextBlur}/> */}
                        <input className="task-text" value={editTitle} type="text" onChange={handleTitleChange}/>
                </div>
                                
                {/* DELETING THE TASK */}
                <FlutterDashIcon className='icon' style={{cursor: 'pointer'}} onClick={() => onDelete(task.id)} />
                
                <div class='break'></div>

                <button type="submit">
                    <ModeEditIcon className='icon' style={{cursor: 'pointer'}} />
                </button>
                

                <div class='break'></div>
                
                <div className="form-group">
                        {/* <input className='Item' value={editingTextValue} onChange={onTextChange} onKeyDown={onKeyDown} onBlur={onTextBlur}/> */}
                        <input className="task-text" value={editDescription} type="text" onChange={handleDescChange}/>
                </div>
                
                <div class='break'></div>

                {/* <div as={customDatePicker} value={editDueDate} onChange={(e) => setEditDueDate(e.target.value)} style={{width: "75%", maxWidth: "1000px", margin: "auto"}}/> */}

                <p className='Item'> <FaCalendarAlt style={{marginBottom: "5px", marginRight: "5px"}}/>
                    {task.dueDate.toLocaleString('en-us', {weekday:"long", year:"numeric", month:"short", day:"numeric", hour: "numeric", minute: "numeric"})}
                </p>

                <div class='break'></div>

                {/* Showing subtasks */}
                <DirectionsRunIcon className='icon' style={{cursor: 'pointer'}} onClick={() => setShowSubTasks(!showSubTasks)} />

                <div class='break'></div>

                {showSubTasks ? <p className='Item'>{task.subtasks.length > 0 ? task.subtasks : <></>}</p> : <></>}

                {/* Allow for editing tasks */}
            </form>
        </TaskContainer>
    )


    return (
        <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>
        // <TaskContainer className='container'>
        //     <form>
        //         <div className="form-group">
        //             <input className="task-text" placeholder={task.text} type="text" />
        //         </div>
        //         <Button type = "submit" variant="primary">EDIT</Button>
                
        //         <h2> Title </h2>
        //         <FlutterDashIcon className='icon' style={{cursor: 'pointer'}} onClick={() => onDelete(task.id)} />
                
        //         <div class='break'></div>

        //         {/* TITLE!! */}
        //         <input className='Item' value={task.text}/>
        //         {/* <input className='Item' value={editingTextValue} onChange={onTextChange} onKeyDown={onKeyDown} onBlur={onTextBlur}/> */}

        //         <div class='break'></div>

        //         {/* <input className='Item' value={editingDescValue} onChange={onDescChange} onKeyDown={onKeyDown} onBlur={onDescBlur}/> */}
                
        //         <p className='Item'>{task.description}</p>
                
        //         <div class='break'></div>

        //         {/* <h3 onMouseEnter={changeBackground} onMouseLeave={defaultBackground}>{task.text} </h3> */}
        //         {/* <p>{task.description}</p> */}
        //         <p className='Item'> <FaCalendarAlt style={{marginBottom: "5px", marginRight: "5px"}}/>
        //             {task.dueDate.toLocaleString('en-us', {weekday:"long", year:"numeric", month:"short", day:"numeric", hour: "numeric", minute: "numeric"})}
        //         </p>

        //         {/* {task.priority ? (
        //             <p>
        //                 ❗High Priority
        //             </p>
        //         ) : <></>} */}

        //         <div class='break'></div>

        //         <DirectionsRunIcon className='icon' style={{cursor: 'pointer'}} onClick={() => setShowSubTasks(!showSubTasks)} />

        //         <div class='break'></div>

        //         {showSubTasks ? <p className='Item'>{task.subtasks.length > 0 ? task.subtasks : <></>}</p> : <></>}

        //     </form>
        // </TaskContainer>
    )
}

export default Task