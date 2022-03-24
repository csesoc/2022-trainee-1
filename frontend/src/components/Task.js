import React, { useState } from 'react'
import { FaCalendarAlt } from 'react-icons/fa'
import styled from 'styled-components';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import FlutterDashIcon from '@mui/icons-material/FlutterDash';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Button from 'react-bootstrap/Button';
import DateTimePicker from '@mui/lab/DateTimePicker'; 
import TextField from '@mui/material/TextField';
import AddSubtask from './AddSubtask';
import Tasks from './Tasks';
import LinearProgress from '@mui/material/LinearProgress';

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

const Task = ({task, onDelete, onEdit, onAddSubtask}) => {
    const [addingSubtask, setAddingSubtask] = useState(false)
    
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
            renderInput={(params) => <TextField {...params} 
            />}
            /> 
    )});

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
        const newSubtasks = task.subtasks
        const status = t.get("complete")
        t.set("complete", !status)
        newSubtasks[index] = t
        onAddSubtask(task.id, newSubtasks)
    }

    const displaySubtasks = () => {
        console.log("hello")
        console.log(task.subtasks[0].get("complete"))
        return <> 
            {task.subtasks && task.subtasks.map((t, index) => <p className="Item"><input className="Item" onClick={() => onChecked(t, index)} type="checkbox"></input> {!t.get("complete") ? t.get("task") : <del>{t.get("task")}</del>}</p>)}
        </>
    }


    const viewTemplate = (
        <TaskContainer className='container'>
            <h2> Title </h2>
            {/* Progress bar that fails to show :(()) */}
            {/* <LinearProgress className="item" variant="determinate" value="10" /> */}
            
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
            <DirectionsRunIcon className='icon' style={{cursor: 'pointer'}} onClick={() => setAddingSubtask(!addingSubtask)} />
            
            <div class='break'></div>

            {addingSubtask ?  <AddSubtask className='Item' task={task} onAddSubtask={onAddSubtask}> </AddSubtask> : <></>}

            <div class='break'></div>

        
            <p>{displaySubtasks()}</p>

            {/* <div>
                {task.subtasks.length > 0 ? task.subtasks: <></>}
            </div> */}

            <div class='break'></div>
            <div>
                {task.subtasks.length > 0 ? task.subtasks.map(subtask => {
                        <h2 className='Item'>{subtask}</h2>
                }) : <></>}
            </div>


            {/* Allow for editing tasks */}
            
        </TaskContainer>
    )

    const progress = () => {
        const completed = task.subtasks.filter(t => t.get("complete")).length
        console.log("hello")
        return completed / task.subtasks.length
        
    }

    const editingTemplate = (
        <TaskContainer className='container'>
            <form onSubmit={handleEditSubmit}>
                <h2> Title </h2>
                
                {/* <LinearProgress variant="determinate" value={progress} /> */}
                
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
                <DirectionsRunIcon className='icon' style={{cursor: 'pointer'}} onClick={() => setAddingSubtask(!addingSubtask)} />
                
                <div class='break'></div>

                {addingSubtask ?  <AddSubtask className='Item' task={task} onAddSubtask={onAddSubtask}> </AddSubtask> : <></>}

                <div class='break'></div>


                <p>{displaySubtasks()}</p>
                {/* Allow for editing tasks */}
                <div className="form-group">
                        {/* <input className='Item' value={editingTextValue} onChange={onTextChange} onKeyDown={onKeyDown} onBlur={onTextBlur}/> */}
                        <input className="task-text" value={editTitle} type="text" onChange={handleTitleChange}/>
                </div>
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