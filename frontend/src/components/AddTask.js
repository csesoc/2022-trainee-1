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

const AddTask = ({onAdd}) => {
    const [text, setText] = useState('')
    const [description, setDescription] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [tags, setTags] = useState([])
    const [priority, setPriority] = useState(false)
    const [subtasks, setSubtasks] = useState([])
    
    const onSubmit = (e) => {
        e.preventDefault()

        // TODO: maybe instead of alerting you just can't submit the form without the title? (like in Google Forms)
        if (!text) {
            alert('Please add a task title')
            return
        }

        onAdd({text, description, dueDate, tags, priority, subtasks})

        // Clear form
        setText('')
        setDescription('')
        setDueDate('')
        setTags([])
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

            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label><h5>Categories</h5></Form.Label>
                <CategoryTags tags={tags} setTags={setTags}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
                <Form.Label><h5>Due Date</h5></Form.Label>
                <br />
                <Form.Control as={customDatePicker} value={dueDate} onChange={(e) => setDueDate(e.target.value)} style={{width: "75%", maxWidth: "1000px", margin: "auto"}}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="High Priority" onChange={(e) => {
                    setPriority(e.target.checked)
                    }}/>
            </Form.Group>

            <Button type="submit" variant="primary">Add Task</Button>{' '}
            </Form>
        </AddTaskContainer>
    )
}

export default AddTask