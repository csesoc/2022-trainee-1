import Task from './Task'

const TodaysTasks = ({tasks, onDelete}) => {
    const today = new Date();    
    const todaysTasks = tasks.filter((task) => {
        var taskDate = task.dueDate.toString("r");
        return task.dueDate && taskDate.slice(0,10) == `${today.getFullYear(0)}-${String(today.getMonth(0) + 1).padStart(2,'0')}-${String(today.getDate(0), 2).padStart(2,'0')}`;
    });

    return (
        <>
            {todaysTasks.length > 0 ?  todaysTasks.map((task, index) => (
                <Task key={index} task={task} onDelete ={onDelete} />)) : "No tasks to do today"}
        </>
    )
}

export default TodaysTasks



