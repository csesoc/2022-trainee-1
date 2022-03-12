import React, { useState } from 'react'
import { FaCalendarAlt } from 'react-icons/fa'
import {FaTimes} from 'react-icons/fa'
import styled from 'styled-components';

export const TaskContainer = styled.div`     
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

const Task = ({task, onDelete}) => {
    const [textValue, setTextValue] = useState(task.text);

    const [editingTextValue, setEditingTextValue] = useState(textValue);
  
    const [descValue, setDescValue] = useState(task.description);
    const [editingDescValue, setEditingDescValue] = useState(descValue);
    
    const onTextChange = (event) => setEditingTextValue(event.target.textValue);
    const onDescChange = (event) => setEditingDescValue(event.target.descValue);
    
    const onKeyDown = (event) => {
      if (event.key === "Enter" || event.key === "Escape") {
        event.target.blur();
      }
    }
  
    const onTextBlur = (event) => {
        setTextValue(event.target.textValue)
    }

    const onDescBlur = (event) => {
        setDescValue(event.target.descValue)
    }



    const changeBackground = (e) => {
        e.target.style.background = 'red'
    }
    const defaultBackground = (e) => {
        e.target.style.background = "white"
    }

    return (
        <TaskContainer>
            <FaTimes style={{color: 'red', cursor: 'pointer'}} onClick={() => onDelete(task.id)} />
            {/* <p>{editingTextValue}</p>
            <p>{textValue}</p>
            <p>{task.text}</p> */}
            <input value={task.text} onChange={onTextChange} onKeyDown={onKeyDown} onBlur={onTextBlur}/>
            
            <input value={task.description} onChange={onDescChange} onKeyDown={onKeyDown} onBlur={onDescBlur}/>
            {/* <h3 onMouseEnter={changeBackground} onMouseLeave={defaultBackground}>{task.text} </h3> */}
            {/* <p>{task.description}</p> */}
            <p> <FaCalendarAlt style={{marginBottom: "5px", marginRight: "5px"}}/>
                {task.dueDate.toLocaleString('en-us', {weekday:"long", year:"numeric", month:"short", day:"numeric", hour: "numeric", minute: "numeric"})}
            </p>
            {task.priority ? (
                <p>
                    ❗High Priority
                </p>
            ) : <></>}
        </TaskContainer>
    )
}

export default Task