import Task from './Task'

const TodaysTasks = ({tasks, onDelete}) => {
    // function to find today's tasks
    const today = new Date();
    const todaysDate = `${today.getFullYear()} ${today.getMonth() + 1} ${today.getDate()}`
    const todaysTasks = tasks.filter((task) => `${task.dueDate.getFullYear()} ${task.dueDate.getMonth() + 1} ${task.dueDate.getDate()}` === todaysDate)

    return (
        <>
            {/* {todaysTasks.length > 0 ?  todaysTasks.map() : "No tasks to do today"} */}
            {todaysTasks.map((task, index) => (
                <Task key={index} task={task} onDelete ={onDelete} />
            ))}
        </>
    )
}

export default TodaysTasks



