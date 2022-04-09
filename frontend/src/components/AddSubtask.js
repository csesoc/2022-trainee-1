import React, { useState } from 'react'
import Button from "@mui/material/Button";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
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

const AddSubtask = ({task, onAddSubtask, closeForm, calculateNewProgress }) => {
    const [subtaskText, setSubtaskText] = useState('')

    const [subtasks, setSubtasks] = useState(task.subtasks);
    
    const onSubmit = (e) => {
        e.preventDefault()
        closeForm();
        const subtaskMap = new Map();
        subtaskMap.set("task", subtaskText)
        subtaskMap.set("complete", false)
        setSubtasks([...subtasks, subtaskMap])

        // subtasks now includes the subtask we just added
        onAddSubtask(task.id, [...subtasks, subtaskMap]);

        calculateNewProgress();
        // Clear form
        setSubtaskText('')
    }

    const hasSubtaskText = () => {
        return subtaskText.length
    }

    return (
        <AddTaskContainer className='AddTaskContainer'>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input
                        className="task-text"
                        placeholder="Enter subtask"
                        style={{"text-align": "center"}}
                        type="text"
                        value={subtaskText}
                        onChange={(e) => setSubtaskText(e.target.value)}
                    />
                </div>
                <br></br>
                <Button
                    variant="outlined"
                    type="submit"
                    disabled={!hasSubtaskText()}
                    startIcon={<ModeEditIcon />}
                    color="inherit"
                >
                    Add
                </Button>
            </form>
        </AddTaskContainer>
        
    )
}

export default AddSubtask