import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DateTimePicker from '@mui/lab/DateTimePicker'; 
import TextField from '@mui/material/TextField';
import styled from 'styled-components';
import CategoryTags from './CategoryTags';

export const AddTaskContainer = styled.div`
    margin: 30px auto;
    padding: 20px;
    cursor: pointer;
    width: 40%;
    border-radius: 10px;
    background-color: rgba(162, 210, 255, 0.1);
`

const AddSubtask = ({ task, onAddSubtask, closeForm, calculateNewProgress }) => {
    const [subtaskText, setSubtaskText] = useState('')

    const [subtasks, setSubtasks] = useState(task.subtasks);
    //const [editSubtask, setEditSubtask] = useState(task.subtasks);
    
    const onSubmit = (e) => {
        e.preventDefault()
        closeForm();
        const subtaskMap = new Map();
        subtaskMap.set("task", subtaskText)
        subtaskMap.set("complete", false)
        setSubtasks([...subtasks, subtaskMap])

        // subtasks now includes the subtask we just added
        onAddSubtask(task.id, [...subtasks, subtaskMap])
        
        console.log(task.subtasks.length)
        calculateNewProgress();
        // Clear form
        setSubtaskText('')
    }

    return (
        <AddTaskContainer className='AddTaskContainer'>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input className="task-text" placeholder="add subtask" type="text" value={subtaskText} onChange={(e) => setSubtaskText(e.target.value)}/>
                </div>

                <button type="submit">add</button>
            </form>
        </AddTaskContainer>
        
    )
}

export default AddSubtask