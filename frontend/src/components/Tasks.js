import Task from './Task'

const Tasks = ({tasks, onDelete, onEdit, onAddSubtask}) => {
    const highPriorityTasks = tasks.slice().filter(a => a.priority === true)
    const lowPriorityTasks = tasks.slice().filter(a => a.priority === false)
    const sortedTasks = highPriorityTasks.sort((a, b) => a.dueDate && b.dueDate ? (a.dueDate - b.dueDate) : (b.dueDate ? -1 : (a.dueDate ? 1 : 0))).concat(lowPriorityTasks.sort((a, b) => a.dueDate && b.dueDate ? (a.dueDate - b.dueDate) : (b.dueDate ? -1 : (a.dueDate ? 1 : 0))))
    //console.log(sortedTasks)
    
    return (
        <>
            {sortedTasks.map((task) => (
                <>
                <Task task={task} onDelete={onDelete} onEdit={onEdit} onAddSubtask={onAddSubtask}/>
                </>
            ))}
        </>
    )
}

export default Tasks

