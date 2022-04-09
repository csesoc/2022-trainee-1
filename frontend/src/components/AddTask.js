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

const AddTask = ({onAdd, globalTags, setGlobalTags}) => {
    const [text, setText] = useState('')
    const [description, setDescription] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [tag, setTag] = useState(null);
    const [priority, setPriority] = useState(false)
    const [subtasks, setSubtasks] = useState([])

    const onSubmit = (e) => {
        e.preventDefault()

        // TODO: maybe instead of alerting you just can't submit the form without the title? (like in Google Forms)
        if (!text) {
            alert('Please add a task title')
            return
        }

        if (dueDate && dueDate < Date.now()) {
            alert('Please enter a time in the future')
            return
        }

        onAdd({text, description, dueDate, tag, priority, subtasks})

        // Clear form
        setText('')
        setDescription('')
        setDueDate('')
        setTag(null)
        setPriority(false)
        setSubtasks([])
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

    const InputStyle = {
        width: "75%", 
        maxWidth: "1000px", 
        margin: "auto", 
        borderTopStyle: "hidden", 
        borderRightStyle: "hidden", 
        borderLeftStyle: "hidden", 
        borderBottomStyle: "dashed", 
        borderColor: "black", 
        borderRadius: "2px", 
        background: "#f6faff"
    }

    return (
        <AddTaskContainer className='AddTaskContainer'>
            <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label><h5>Task Title</h5></Form.Label>
                <Form.Control placeholder="Enter task" value={text} 
                onChange={(e) => setText(e.target.value)} style={InputStyle}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label><h5>Task Description</h5></Form.Label>
                <Form.Control type="text" placeholder="Enter description" value={description} 
                onChange={(e) => setDescription(e.target.value)} style={InputStyle}/>
            </Form.Group>

            <Form.Group className="mb-3" style={{"display": "flex", "flex-direction": "column", "align-items": "center", "gap": "10px"}} controlId="formBasicText">
                <Form.Label><h5>Categories</h5></Form.Label>
                {/* <select className="categories">
                    <option value="select a tag">Select a tag</option>
                </select>
                <input type="submit" value="Submit" /> */}
                <CategoryTags tag={tag} setTag={(tag) => setTag(tag)} globalTags={globalTags} setGlobalTags={(tag) => setGlobalTags([...globalTags, tag])}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
                <Form.Label><h5>Due Date</h5></Form.Label>
                <br />
                <Form.Control as={customDatePicker} value={dueDate} onChange={(e) => setDueDate(e.target.value)} style={{width: "75%", maxWidth: "1000px", margin: "auto"}}/>
            </Form.Group>

            <Form.Group className="mb-3" style={{"display": "flex", "justify-content": "center"}} controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="High Priority" onChange={(e) => {
                    setPriority(e.target.checked)
                    }}/>
            </Form.Group>

            <Button
                variant="outlined"
                type="submit"
                startIcon={<ModeEditIcon />}
                >
                Add
            </Button>
            </Form>
        </AddTaskContainer>
    )
}

export default AddTask