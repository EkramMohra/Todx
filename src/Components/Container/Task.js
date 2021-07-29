import React from 'react';
import Popup from './popup';
import { useState } from 'react';
import Card from 'react-bootstrap/Card'
import './task.css'

const Task = (props) => {
    const [modalShow, setModalShow] = useState(false);
    const deleteTask = () => props.deleteTask(props.task.id)
    return (
        <>
            <Popup show={modalShow}
                task={props.task} updateTask={props.updateTask}
                onHide={() => setModalShow(false)} time={props.task.time} 
                priority={props.task.priority} notification={props.task.notification} 
                date={props.task.date}/>
            <Card style={{ width: '18rem' }} className="mb-2  task-background" >
                <Card.Header> {props.task.title} </Card.Header>
                <Card.Body>
                    <Card.Title> {props.task.content} </Card.Title>
                    {props.task.time ? <Card.Title> {props.task.time}</Card.Title> : null}
                    <button onClick={() => setModalShow(true)}>edit</button>
                    <button onClick={deleteTask}>remove</button>
                </Card.Body>
            </Card>
        </>
    )
}
export default Task;