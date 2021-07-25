import React from 'react';
import Task from './Task';

const List = (props) => {
    return (
        <div>
            {props.tasks.map((task,index) => <Task key={index} task={task}/>)}
        </div>
    );
};

export default List;