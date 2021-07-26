import React from 'react';
import { inject, observer } from 'mobx-react';
import MyModal from './popup';
import { useState } from 'react';

const Task = (props) => {


    const [modalShow, setModalShow] = useState(false);

    function deleteTask() {
        
        props.list.deleteTask(props.task.id)

    }

    return (
        <>
            <MyModal show={modalShow}
                task={props.task}
                onHide={() => setModalShow(false)}
            />

            <div>
                <span>{props.task.id}</span>
                <span>{props.task.title}</span>
                <span>{props.task.content}</span>
                <span>{props.task.time}</span>
                <span>{props.task.date}</span>
                <span>{props.task.notification}</span>
                <span>{props.task.status}</span>
                <span>{props.task.favourite}</span>
                <button onClick={() => setModalShow(true)}>edit</button>
                <button onClick={deleteTask}>remove</button>
            </div>
        </>
    )
}

export default inject("list")(observer(Task));

