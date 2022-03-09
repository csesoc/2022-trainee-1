import Task from './Task'

const Tasks = ({tasks, onDelete}) => {
    /*
    tasks = name of the state
    setTasks = function to update the state
    the array = default used for this state
    tasks is immutable --> to change it, you would have setTasks(new array, including the old one)
    */
    
    const sortedTasks = tasks.slice().sort((a, b) => a.priority === b.priority ? a.dueDate && b.dueDate ? a.dueDate - b.dueDate : a.dueDate ? 1 : b.dueDate ? -1 : 1 : a.priority - b.priority)
    
    return (
        <>
            {sortedTasks.map((task) => (
                <Task task={task} onDelete={onDelete}/>
            ))}
        </>
    )
}

export default Tasks