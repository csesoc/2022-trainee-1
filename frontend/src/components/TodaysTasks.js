import Task from './Task'

const TodaysTasks = ({tasks, onDelete}) => {
    const today = new Date();
    const todaysDate = `${today.getFullYear()} ${today.getMonth() + 1} ${today.getDate()}`
    const todaysTasks = tasks.filter((task) => task.dueDate && `${task.dueDate.getFullYear()} ${task.dueDate.getMonth() + 1} ${task.dueDate.getDate()}` === todaysDate)

    return (
        <>
            {todaysTasks.length > 0 ?  todaysTasks.map((task, index) => (
                <Task key={index} task={task} onDelete ={onDelete} />)) : "No tasks to do today"}
        </>
    )
}

export default TodaysTasks



