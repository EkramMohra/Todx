import React from 'react';

const Task = (props) => {
    return (
        <div>
            <span>{props.task.id}</span>
            <span>{props.task.title}</span>
            <span>{props.task.content}</span>
            <span>{props.task.time}</span>
            <span>{props.task.date}</span>
            <span>{props.task.notification}</span>
            <span>{props.task.status}</span>
            <span>{props.task.favourite}</span>
        </div>
    )
}



export default Task;