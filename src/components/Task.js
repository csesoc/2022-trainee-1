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
export const CrossFlexBox = styled.div` 
    margin-left = 30 px;
`
{/* <FaTimes style={{color: 'red', cursor: 'pointer'}} onClick={() => onDelete(task.id)} /> */}
const Task = ({task, onDelete}) => {

    return (
        <TaskContainer>
            <FaTimes style={{color: 'red', cursor: 'pointer'}} onClick={() => onDelete(task.id)} />
            <h3>{task.text} </h3>
            <p>{task.description}</p>
            <p> <FaCalendarAlt style={{marginBottom: "5px", marginRight: "5px"}}/>
                {task.dueDate.toLocaleString('en-us', {weekday:"long", year:"numeric", month:"short", day:"numeric", hour: "numeric", minute: "numeric"})}
            </p>
        </TaskContainer>
    )
}

export default Task