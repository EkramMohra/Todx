import React from 'react';
import Popup from './popup';
import { useState } from 'react';
import Card from 'react-bootstrap/Card'
import './task.css'
import Button from 'react-bootstrap/Button'


const Task = (props) => {
    
    const [modalShow, setModalShow] = useState(false);
    const deleteTask = () => props.deleteTask(props.task.id)
    const doneTask = () => props.doneTask(props.task.id)
    
    return (
        <>

            <Popup show={modalShow}
                task={props.task} updateTask={props.updateTask}
                onHide={() => setModalShow(false)} time={props.task.time}
                priority={props.task.priority} notification={props.task.notification}
                date={props.task.date}  />

            <Card style={{ width: '90%' }} 
            className={`mb-2 ${props.task.status === "pending" ? "pending" : "done"}` } >
                <Card.Header> {props.task.title} </Card.Header>
                <Card.Body>
                    <Card.Title> {props.task.content} </Card.Title>
                    {props.task.time ? <Card.Title> {props.task.time}</Card.Title> : null}
                    <button onClick={() => setModalShow(true)}>edit</button>
                    <button onClick={deleteTask}>remove</button>
                    <Button onClick={doneTask} disabled = {props.task.status === "done"? 'disabled' : null}>Done</Button>

                </Card.Body>
            </Card>
        </>
    )
}
export default Task;