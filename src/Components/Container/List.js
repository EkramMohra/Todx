import React from 'react';
import Task from './Task';
import { useState,useEffect } from 'react';

const List = (props) => {

    const [listOfTasks, setListOfTasks] = useState([]);

    useEffect(() => {
        setListOfTasks(props.tasks)
    }, [props.tasks]);

    console.log(listOfTasks)

    return (
        <div>
            {listOfTasks.map((task,index) => <Task key={index} task={task}/>)}
        </div>
    );
};

export default List;