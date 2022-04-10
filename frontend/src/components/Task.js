import React, { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import styled from "styled-components";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import CancelIcon from "@mui/icons-material/Cancel";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DateTimePicker from "@mui/lab/DateTimePicker";
import TextField from "@mui/material/TextField";
import AddSubtask from "./AddSubtask";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./Task.css";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

export const TaskContainer = styled.div`
    display: flex;
    flex-direction: column;
    background: white;
    margin: 30px auto;
    padding: 20px;
    cursor: pointer;
    width: 50%;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(162, 210, 255, 0.5);
`;

export const PriorityTaskContainer = styled(TaskContainer)`
    box-shadow: 0px 0px 10px rgba(227, 99, 112, 1);
`;

function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ width: "100%", mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography
                    variant="body2"
                    color="text.secondary"
                >{`${Math.round(props.value)}%`}</Typography>
            </Box>
        </Box>
    );
}

const Task = ({ task, onDelete, onEdit, onAddSubtask }) => {
    const [addingSubtask, setAddingSubtask] = useState(false);

    const [isEditing, setEditing] = useState(false);

    const [title, setTitle] = useState(task.text);
    const [editTitle, setEditTitle] = useState(task.text);

    const [description, setDescription] = useState(task.description);
    const [editDescription, setEditDescription] = useState(task.description);

    // TODO: Add ability to edit date
    const [dueDate, setDueDate] = useState(task.dueDate);
    const [editDueDate, setEditDueDate] = useState(task.dueDate);

    const [priority, setPriority] = useState(task.priority);

    const [progress, setProgress] = useState(0);

    function handleTitleChange(e) {
        setEditTitle(e.target.value);
    }

    function handleDescChange(e) {
        setEditDescription(e.target.value);
    }

    function handleEditSubmit(e) {
        e.preventDefault();
        submit();
    }

    function submit() {
        setTitle(editTitle);
        setDescription(editDescription);
        setDueDate(editDueDate);
        onEdit(task._id, editTitle, editDescription, editDueDate);
        setEditing(false);
    }

    // submits using enter key
    function handleEnter(e) {
        if (e.key === "Enter") {
            submit();
        }
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
                renderInput={(params) => <TextField {...params} />}
            />
        );
    });

    const onChecked = (t, index) => {
        const newSubtasks = task.subtasks;
        const status = t.get("complete");
        t.set("complete", !status);
        newSubtasks[index] = t;

        setProgress(
            (task.subtasks.filter((t) => t.get("complete")).length /
                task.subtasks.length) *
                100
        );
        onAddSubtask(task.id, newSubtasks);
    };

    const displaySubtasks = () => {
        return (
            <>
                {task.subtasks.length > 0 ? <Divider></Divider> : <></>}
                {task.subtasks.length > 0 ? (
                    <div className="subtask-title">Subtasks</div>
                ) : (
                    <></>
                )}
                {task.subtasks.length > 0 ? (
                    <LinearProgressWithLabel value={progress} />
                ) : (
                    <></>
                )}

                {task.subtasks &&
                    task.subtasks.map((t, index) => (
                        <div>
                            <Divider>{index + 1}</Divider>
                            <div className="subtask">
                                <input
                                    type="checkbox"
                                    onClick={() => onChecked(t, index)}
                                    checked={t.get("complete")}
                                ></input>
                                <div className="subtask-name">
                                    {!t.get("complete") ? (
                                        t.get("task")
                                    ) : (
                                        <del>{t.get("task")}</del>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
            </>
        );
    };

    const showDate = () => {
        const dateObj = new Date(task.dueDate);
        return dateObj.toLocaleString("en-us", {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
        });
    }
    const renderViewTask = () => {
        return (
            <>
                <div className="title-container">
                    {/* TODO: TEMP FIX FOR CENTERING THE TITLE */}
                    <div className="title">{task.text}</div>
                    <div className="icon-container">
                        {/* Showing subtasks*/}
                        <FormatListBulletedIcon
                            className="icon"
                            style={{ cursor: "pointer" }}
                            onClick={() => setAddingSubtask(!addingSubtask)}
                        />
                        {/* PENCIL */}
                        <ModeEditIcon
                            className="icon"
                            style={{ cursor: "pointer" }}
                            onClick={() => setEditing(!isEditing)}
                        />
                        {/* DELETING THE TASK - OWL */}
                        <CancelIcon
                            className="delete-icon"
                            style={{ cursor: "pointer" }}
                            onClick={() => onDelete(task._id)}
                        />
                    </div>
                </div>
                {/* Progress bar that fails to show :(()) */}
                {/* <LinearProgress className="item" variant="determinate" value="10" /> */}
                <p className="Item">{task.description}</p>
                <div className="calendar-container">
                    {showDate().length ? (
                        <FaCalendarAlt
                            style={{ marginBottom: "5px", marginRight: "5px" }}
                        />
                    ) : (
                        <></>
                    )}
                    {showDate()}
                </div>

                {addingSubtask ? (
                    <AddSubtask
                        className="Item"
                        task={task}
                        onAddSubtask={onAddSubtask}
                        closeForm={() => setAddingSubtask(!addingSubtask)}
                        calculateNewProgress={() =>
                            setProgress(
                                (task.subtasks.filter((t) => t.get("complete"))
                                    .length /
                                    (task.subtasks.length + 1)) *
                                    100
                            )
                        }
                    >
                        {" "}
                    </AddSubtask>
                ) : (
                    <></>
                )}
                <div className="subtasks">{displaySubtasks()}</div>
                <div className="task-tags">
                    {task.tags.map((t) => (
                        <div className="tags">
                            <LocalOfferIcon
                                style={{
                                    width: "1em",
                                    height: "0.8em",
                                    color: "#808080",
                                }}
                            />
                            <div className="tagname">{t}</div>
                        </div>
                    ))}
                </div>
            </>
        );
    };

    const viewTemplate = () => {
        return task.priority ? (
            <PriorityTaskContainer>{renderViewTask()}</PriorityTaskContainer>
        ) : (
            <TaskContainer>{renderViewTask()}</TaskContainer>
        );
    };

    const renderEditTask = () => {
        return (
            <>
                <form className="form-container" onSubmit={handleEditSubmit}>
                    <div className="title-container">
                        <div className="form-group">
                            <input
                                className="edit-input title"
                                value={editTitle}
                                type="text"
                                onChange={handleTitleChange}
                                onKeyDown={handleEnter}
                            />
                        </div>
                        <div className="icon-container">
                            {/* Showing subtasks - Running Man */}
                            <FormatListBulletedIcon
                                className="icon"
                                style={{ cursor: "pointer" }}
                                onClick={() => setAddingSubtask(!addingSubtask)}
                            />
                            {/* PENCIL */}
                            <button type="submit" className="override-button">
                                <ModeEditIcon
                                    className="icon"
                                    style={{ cursor: "pointer" }}
                                />
                            </button>
                            {/* DELETING THE TASK*/}
                            <CancelIcon
                                className="delete-icon"
                                style={{ cursor: "pointer" }}
                                onClick={() => onDelete(task._id)}
                            />
                        </div>
                    </div>
                    <div className="form-group Item">
                        <input
                            className="task-text edit-input"
                            value={editDescription}
                            type="text"
                            onChange={handleDescChange}
                            onKeyDown={handleEnter}
                        />
                    </div>

                    <div className="calendar-container">
                        {showDate().length ? (
                            <FaCalendarAlt
                                style={{
                                    marginBottom: "5px",
                                    marginRight: "5px",
                                }}
                            />
                        ) : (
                            <></>
                        )}
                        {showDate()}
                    </div>

                    {addingSubtask ? (
                        <AddSubtask
                            className="Item"
                            task={task}
                            onAddSubtask={onAddSubtask}
                            closeForm={() => setAddingSubtask(!addingSubtask)}
                            calculateNewProgress={() =>
                                setProgress(
                                    (task.subtasks.filter((t) =>
                                        t.get("complete")
                                    ).length /
                                        (task.subtasks.length + 1)) *
                                        100
                                )
                            }
                        >
                            {" "}
                        </AddSubtask>
                    ) : (
                        <></>
                    )}

                    <div className="subtasks">{displaySubtasks()}</div>
                    <div className="task-tags">
                        {task.tags.map((t) => (
                            <div className="tags">
                                <LocalOfferIcon
                                    style={{
                                        width: "1em",
                                        height: "0.8em",
                                        color: "#808080",
                                    }}
                                />
                                <div className="tagname">{t}</div>
                            </div>
                        ))}
                    </div>
                </form>
            </>
        );
    };

    const editingTemplate = () => {
        return task.priority ? (
            <PriorityTaskContainer>{renderEditTask()}</PriorityTaskContainer>
        ) : (
            <TaskContainer>{renderEditTask()}</TaskContainer>
        );
    };

    return (
        <div className="todo">
            {isEditing ? editingTemplate() : viewTemplate()}
        </div>
    );
};

export default Task;
