import Task from './Task'

const Tasks = ({tasks, onDelete}) => {
    /*
    tasks = name of the state
    setTasks = function to update the state
    the array = default used for this state
    tasks is immutable --> to change it, you would have setTasks(new array, including the old one)
    */
   
    return (
        // Each child in a list should have a unique "key" prop, therefore id is used as the unique key
        <>
            {tasks.map((task) => (
                <Task task={task} onDelete={onDelete}/>
            ))}
        </>
    )
}

export default Tasks