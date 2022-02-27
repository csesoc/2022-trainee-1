import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DatePicker from '@mui/lab/DatePicker'; 
import TextField from '@mui/material/TextField';


const AddTask = ({onAdd}) => {
    const [text, setText] = useState('')
    const [description, setDescription] = useState('')
    const [dueDate, setDueDate] = useState('')
    
    const onSubmit = (e) => {
        e.preventDefault()

        // Validation for fields entered
        if (!text) {
            alert('Please add a task')
            return
        }

        onAdd({text, description, dueDate})

        // Clear form
        setText('')
        setDescription('')
        setDueDate('')
    }

    const customDatePicker = React.forwardRef((props, ref) => {
        return (
            <DatePicker
            label="Task Date"
            value={dueDate}
            onChange={(newDate) => {
                setDueDate(newDate);
            }}
            renderInput={(params) => <TextField {...params} />}
            /> 
    )});

    return (
        // <form classname='add-form' onSubmit={onSubmit}>
        //     <div className='form-control'>
        //         <label>Task</label>
        //         <input type='text' placeholder='Add Task' value={text} onChange={(e) => setText(e.target.value)} />
        //     </div>
        //     <div className='form-control'>
        //         <label>Day & Time</label>
        //         <input type='text' placeholder='Add Day & Time' value={day} onChange={(e) => setDay(e.target.value)} />
        //     </div>
        //     <div className='form-control form-control-check'>
        //         <label>Set Reminder</label>
        //         <input type='checkbox'checked={reminder} value={reminder} onChange={(e) => setReminder(e.currentTarget.checked)} />
        //     </div>

        //     <input type='submit' value='Save Task' className='btn btn-block'/>
        // </form>

        <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Task Title</Form.Label>
            <Form.Control placeholder="Enter task" value={text} onChange={(e) => setText(e.target.value)} style={{width: "75%", maxWidth: "1000px", margin: "auto"}}/>
            {/* <Form.Text className="text-muted">
            please give me line breaks :(
            </Form.Text> */}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Task Description</Form.Label>
            <Form.Control type="text" placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} style={{width: "75%", maxWidth: "1000px", margin: "auto"}}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasic">
            <Form.Label>Due Date</Form.Label>
            <br />
            <Form.Control as={customDatePicker} value={dueDate} onChange={(e) => setDueDate(e.target.value)}/>
            {/* <br />
            <DatePicker
                label="Task Date"
                value={date}
                onChange={(newDate) => {
                    setDate(newDate);
                }}
                renderInput={(params) => <TextField {...params} />}
            />  */}

        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="High Priority" />
        </Form.Group>
        <Button type = "submit" variant="primary">Add Task</Button>{' '}
        </Form>

//         <form>
//   <div class="form-group">
//     <label for="exampleInputEmail1">Email address</label>
//     <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"></input>
//     <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
//   </div>
//   <div class="form-group">
//     <label for="exampleInputPassword1">Password</label>
//     <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"></input>
//   </div>
//   <div class="form-check">
//     <input type="checkbox" class="form-check-input" id="exampleCheck1"></input>
//     <label class="form-check-label" for="exampleCheck1">Check me out</label>
//   </div>
//   <button type="submit" class="btn btn-primary">Submit</button>
// </form>
    )
}

export default AddTask